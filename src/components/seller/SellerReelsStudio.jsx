import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function pickVideoMime() {
  if (typeof MediaRecorder === 'undefined') return '';
  const types = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
  return types.find((t) => MediaRecorder.isTypeSupported(t)) || '';
}

let assetKey = 0;
function nextKey() {
  assetKey += 1;
  return `asset-${assetKey}`;
}

export default function SellerReelsStudio({ showToast }) {
  const fileInputId = useId();
  const [assets, setAssets] = useState([]);
  const [stream, setStream] = useState(null);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const assetsRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    assetsRef.current.forEach((a) => {
      if (a?.url?.startsWith('blob:')) URL.revokeObjectURL(a.url);
    });
  }, []);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
  }, [stream]);

  const addFiles = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    const next = files.map((file) => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('video') ? 'video' : 'image';
      return { id: nextKey(), type, url, name: file.name };
    });
    if (next.length) {
      setAssets((prev) => [...next, ...prev]);
      showToast(`${next.length} file(s) added to your reel library 📁`);
    }
  };

  const removeAsset = (id) => {
    setAssets((prev) => {
      const a = prev.find((x) => x.id === id);
      if (a?.url?.startsWith('blob:')) URL.revokeObjectURL(a.url);
      return prev.filter((x) => x.id !== id);
    });
  };

  const openCamera = async () => {
    setPhotoDataUrl(null);
    setVideoBlobUrl((u) => {
      if (u) URL.revokeObjectURL(u);
      return null;
    });
    stopStream();
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: true,
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {
      showToast('Camera not available — try file upload instead.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL('image/jpeg', 0.9);
    setPhotoDataUrl(url);
    stopStream();
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const savePhotoToLibrary = () => {
    if (!photoDataUrl) return;
    setAssets((prev) => [{ id: nextKey(), type: 'image', url: photoDataUrl, name: 'Camera.jpg' }, ...prev]);
    setPhotoDataUrl(null);
    showToast('Photo added to reel uploads ✨');
  };

  const startRecord = () => {
    if (!stream) return;
    const mime = pickVideoMime();
    if (!mime) {
      showToast('Recording not supported here');
      return;
    }
    chunksRef.current = [];
    const mr = new MediaRecorder(stream, { mimeType: mime });
    mediaRecorderRef.current = mr;
    mr.ondataavailable = (ev) => {
      if (ev.data.size) chunksRef.current.push(ev.data);
    };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mime.split(';')[0] });
      const url = URL.createObjectURL(blob);
      setVideoBlobUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return url;
      });
      stopStream();
      if (videoRef.current) videoRef.current.srcObject = null;
      setRecording(false);
    };
    mr.start(300);
    setRecording(true);
  };

  const stopRecord = () => {
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== 'inactive') mr.stop();
  };

  const saveVideoToLibrary = () => {
    if (!videoBlobUrl) return;
    setAssets((prev) => [{ id: nextKey(), type: 'video', url: videoBlobUrl, name: 'Clip.webm' }, ...prev]);
    setVideoBlobUrl(null);
    showToast('Video clip saved to your library 🎬');
  };

  const publishMock = () => {
    if (!assets.length) {
      showToast('Add at least one image or video first.');
      return;
    }
    showToast(`Queued ${assets.length} asset(s) for reel publish (demo — wire your API next).`);
  };

  return (
    <div className="seller-shell seller-reels-studio">
      <header className="seller-page-head">
        <div>
          <h1 className="seller-page-title">Reels studio</h1>
          <p className="seller-page-sub">Upload product photos & videos, use the camera, and record short reels for buyers.</p>
        </div>
        <Link to="/seller" className="ui-btn-white" style={{ textDecoration: 'none', padding: '0.55rem 1rem' }}>
          ← Seller hub
        </Link>
      </header>

      <div className="seller-studio-grid">
        <section className="seller-studio-panel">
          <h2 className="seller-panel-title">1. Upload files</h2>
          <p className="seller-panel-hint">Drag-ready file picker — images and videos from your device.</p>
          <input id={fileInputId} type="file" accept="image/*,video/*" multiple className="seller-file-input" onChange={addFiles} />
          <label htmlFor={fileInputId} className="seller-file-label ui-btn-red" style={{ cursor: 'pointer', display: 'inline-flex' }}>
            Choose images / videos
          </label>

          <h2 className="seller-panel-title" style={{ marginTop: '1.75rem' }}>2. Camera & recorder</h2>
          <div className="seller-camera-box">
            {!photoDataUrl && !videoBlobUrl && (
              <video ref={videoRef} autoPlay playsInline muted={!recording} className="seller-camera-video" />
            )}
            {photoDataUrl && <img src={photoDataUrl} alt="" className="seller-camera-video" />}
            {videoBlobUrl && !photoDataUrl && <video src={videoBlobUrl} controls className="seller-camera-video" playsInline />}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
          <div className="seller-camera-actions">
            {!stream && !photoDataUrl && !videoBlobUrl && (
              <button type="button" className="ui-btn-red pulse-hover" onClick={openCamera}>
                Open camera
              </button>
            )}
            {stream && !photoDataUrl && !videoBlobUrl && !recording && (
              <>
                <button type="button" className="ui-btn-red pulse-hover" onClick={capturePhoto}>
                  Capture photo
                </button>
                <button type="button" className="ui-btn-white shift-hover" onClick={startRecord}>
                  ● Record video
                </button>
                <button type="button" className="ui-btn-white shift-hover" onClick={stopStream}>
                  Close
                </button>
              </>
            )}
            {stream && recording && (
              <button type="button" className="ui-btn-white shift-hover" onClick={stopRecord}>
                ■ Stop recording
              </button>
            )}
            {photoDataUrl && (
              <>
                <button type="button" className="ui-btn-red pulse-hover" onClick={savePhotoToLibrary}>
                  Add photo to library
                </button>
                <button type="button" className="ui-btn-white shift-hover" onClick={() => setPhotoDataUrl(null)}>
                  Discard
                </button>
              </>
            )}
            {videoBlobUrl && !photoDataUrl && (
              <>
                <button type="button" className="ui-btn-red pulse-hover" onClick={saveVideoToLibrary}>
                  Add video to library
                </button>
                <button
                  type="button"
                  className="ui-btn-white shift-hover"
                  onClick={() => setVideoBlobUrl((u) => { if (u) URL.revokeObjectURL(u); return null; })}
                >
                  Discard
                </button>
              </>
            )}
          </div>

          <h2 className="seller-panel-title" style={{ marginTop: '1.5rem' }}>3. Your uploads</h2>
          {assets.length === 0 ? (
            <p className="seller-panel-hint">No files yet — buyers see your story here once you publish.</p>
          ) : (
            <ul className="seller-asset-list">
              {assets.map((a) => (
                <li key={a.id} className="seller-asset-item">
                  {a.type === 'image' ? (
                    <img src={a.url} alt="" className="seller-asset-thumb" />
                  ) : (
                    <video src={a.url} className="seller-asset-thumb" muted playsInline />
                  )}
                  <span className="seller-asset-name">{a.name}</span>
                  <button type="button" className="seller-asset-remove" onClick={() => removeAsset(a.id)} aria-label="Remove">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button type="button" className="ui-btn-red pulse-hover seller-publish-btn" onClick={publishMock}>
            Publish reel (demo)
          </button>
        </section>

        <section className="seller-studio-panel seller-studio-preview">
          <h2 className="seller-panel-title">Buyer preview</h2>
          <p className="seller-panel-hint">
            Shoppers watch reels on the <strong>Live</strong> tab — same vertical feed, add-to-cart, and captions. Open it to
            sanity-check how your uploads will feel alongside other artisans.
          </p>
          <Link to="/live" className="ui-btn-red seller-preview-cta" style={{ textDecoration: 'none', display: 'inline-flex' }}>
            Open Live reels (buyer view)
          </Link>
          <p className="seller-panel-hint" style={{ marginTop: '1rem' }}>
            Tip: drop vertical 9:16 clips in uploads for the closest match to Instagram-style reels.
          </p>
        </section>
      </div>
    </div>
  );
}
