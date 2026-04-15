import React, { useState } from 'react';
import { MOCK_STORIES } from '../../server/mockData';
import ArtisanStoryModal from './ArtisanStoryModal';

const StoriesWidget = () => {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <>
      <div id="artisan-stories" className="ui-widget ui-bottom-card" style={{ padding: '1.5rem', minHeight: 'auto', flexGrow: 1 }}>
      <div className="widget-header-flex">
        <h3 style={{ fontSize: '1.4rem' }}>Artisan Stories</h3>
        <span className="view-all-link">See All →</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        {MOCK_STORIES.map((story) => (
          <div 
            key={story.id} 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', cursor: 'pointer' }}
            onClick={() => setActiveStory(story)}
            className="shift-hover"
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '2/3', borderRadius: '1rem', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <img src={story.img} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="play-icon" style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', width: '24px', height: '24px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.5)' }}>▶</div>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center' }}>{story.title}</div>
            <div style={{ fontSize: '0.7rem', color: '#888', textAlign: 'center', lineHeight: '1.2' }}>{story.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
      
      {activeStory && (
        <ArtisanStoryModal 
          story={activeStory} 
          onClose={() => setActiveStory(null)} 
        />
      )}
    </>
  );
};

export default StoriesWidget;
