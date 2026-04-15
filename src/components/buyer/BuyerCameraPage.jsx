import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_REELS } from '../../server/mockData';
import auctionPersonImg from '../../assets/auction_person.png';

function pickVideoMime() {
  if (typeof MediaRecorder === 'undefined') return '';
  const types = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
  return types.find((t) => MediaRecorder.isTypeSupported(t)) || '';
}

export default function BuyerCameraPage({ showToast }) {
  const [tab, setTab] = useState('photo');
  const [stream, setStream] = useState(null);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const navigate = useNavigate();

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async () => {
    setPhotoDataUrl(null);
    setVideoUrl((u) => {
      if (u) URL.revokeObjectURL(u);
      return null;
    });
    stopStream();
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: tab === 'video',
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      showToast('Camera or mic not available 🚫');
    }
  }, [stopStream, tab, showToast]);

  useEffect(() => {
    return () => {
      stopStream();
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [stopStream, videoUrl]);

  useEffect(() => {
    if (!stream && tab) return;
    if (stream && videoRef.current) videoRef.current.srcObject = stream;
  }, [tab, stream]);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhotoDataUrl(canvas.toDataURL('image/jpeg', 0.92));
    stopStream();
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const startRecord = () => {
    if (!stream) return;
    const mime = pickVideoMime();
    if (!mime) {
      showToast('Video recording not supported in this browser');
      return;
    }
    chunksRef.current = [];
    const mr = new MediaRecorder(stream, { mimeType: mime });
    mediaRecorderRef.current = mr;
    mr.ondataavailable = (e) => {
      if (e.data.size) chunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mime.split(';')[0] });
      const url = URL.createObjectURL(blob);
      setVideoUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return url;
      });
      stopStream();
      if (videoRef.current) videoRef.current.srcObject = null;
      setRecording(false);
      showToast('Video saved locally — connect cloud to publish ✨');
    };
    mr.start(250);
    setRecording(true);
  };

  const stopRecord = () => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== 'inactive') mr.stop();
  };

  const postToReels = () => {
    if (!videoUrl) return;
    
    // Add new reel at the end of MOCK_REELS
    MOCK_REELS.push({
      id: `reel-${Date.now()}`,
      artisan: 'You',
      craft: 'Community Review',
      artisanAvatar: auctionPersonImg,
      poster: '', // No poster needed for blob URL videos
      videoUrl: videoUrl, // blob URL
      story: 'Here is my live review and demonstration. I really loved using this!',
      likes: 0,
      comments: 0,
      product: null
    });
    
    showToast('Reel published successfully! ✨');
    
    // Navigate to live reels page
    navigate('/live');
  };

  return (
    <div className="media-studio-page">
      <div className="media-studio-head">
        <div>
          <h1 className="media-studio-title">Your camera</h1>
          <p className="media-studio-sub">Take photos or record a short clip — like visual search or reviews on big marketplaces.</p>
        </div>
        <Link to="/shop" className="ui-btn-white" style={{ textDecoration: 'none', padding: '0.55rem 1rem' }}>
          ← Back to shop
        </Link>
      </div>

      <div className="media-studio-tabs">
        <button type="button" className={`media-studio-tab ${tab === 'photo' ? 'active' : ''}`} onClick={() => { setTab('photo'); stopStream(); }}>
          Photo
        </button>
        <button type="button" className={`media-studio-tab ${tab === 'video' ? 'active' : ''}`} onClick={() => { setTab('video'); stopStream(); }}>
          Video
        </button>
      </div>

      <div className="media-studio-body">
        <div className="media-studio-viewport">
          {!photoDataUrl && !videoUrl && (
            <video ref={videoRef} autoPlay playsInline muted={tab === 'photo'} className="media-studio-video" style={{ transform: 'scaleX(-1)' }} />
          )}
          {photoDataUrl && <img src={photoDataUrl} alt="Preview" className="media-studio-preview" />}
          {videoUrl && !photoDataUrl && <video src={videoUrl} controls className="media-studio-preview" playsInline />}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        <div className="media-studio-actions">
          {!stream && !photoDataUrl && !videoUrl && (
            <button type="button" className="ui-btn-red pulse-hover" onClick={startCamera}>
              Open camera
            </button>
          )}
          {stream && tab === 'photo' && !photoDataUrl && (
            <>
              <button type="button" className="ui-btn-red pulse-hover" onClick={takePhoto}>
                Capture photo
              </button>
              <button type="button" className="ui-btn-white shift-hover" onClick={stopStream}>
                Cancel
              </button>
            </>
          )}
          {stream && tab === 'video' && !videoUrl && (
            <>
              {!recording ? (
                <button type="button" className="ui-btn-red pulse-hover" onClick={startRecord}>
                  ● Start recording
                </button>
              ) : (
                <button type="button" className="ui-btn-white shift-hover" onClick={stopRecord}>
                  ■ Stop
                </button>
              )}
              <button type="button" className="ui-btn-white shift-hover" onClick={stopStream} disabled={recording}>
                Cancel
              </button>
            </>
          )}
          {(photoDataUrl || videoUrl) && (
            <>
              {videoUrl && (
                <button
                  type="button"
                  className="ui-btn-red pulse-hover"
                  onClick={postToReels}
                >
                  Post to Reels
                </button>
              )}
              <button
                type="button"
                className="ui-btn-white shift-hover"
                onClick={() => {
                  setPhotoDataUrl(null);
                  setVideoUrl((u) => {
                    if (u) URL.revokeObjectURL(u);
                    return null;
                  });
                }}
              >
                New capture
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
