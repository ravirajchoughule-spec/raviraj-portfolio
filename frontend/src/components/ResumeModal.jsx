import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download, Printer, Maximize2, Minimize2, FileText, Check } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadState, setDownloadState] = useState('idle'); // idle, downloading, success
  const iframeRef = useRef(null);

  // Reset states on close/open
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setZoomLevel(1.0);
        setIsFullscreen(false);
        setIsLoading(true);
      });
    }
  }, [isOpen]);

  const handlePrint = () => {
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow.print();
      } catch (err) {
        console.error("Direct printing failed, opening PDF in a new tab for printing", err);
        window.open("/assets/Raviraj_Choughule_Resume.pdf", "_blank");
      }
    }
  };

  const handleDownload = () => {
    setDownloadState('downloading');
    
    // Create temporary hidden anchor
    const link = document.createElement('a');
    link.href = '/assets/Raviraj_Choughule_Resume.pdf';
    link.download = 'Raviraj_Choughule_Resume.pdf';
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadState('success');
      setTimeout(() => {
        setDownloadState('idle');
      }, 2000);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-55 flex flex-col bg-[#050507]/98 backdrop-blur-md"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0d0d11]/80 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500/20 to-pink-500/20 border border-rose-500/30 flex items-center justify-center">
                <FileText size={16} className="text-rose-400" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white tracking-tight leading-none">
                  Raviraj Choughule - Resume
                </h4>
                <p className="text-[10px] font-mono text-slate-500 tracking-wider mt-1 uppercase">
                  Java Full Stack Developer
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Zoom Out */}
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.15))}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              
              {/* Zoom percentage */}
              <span className="font-mono text-[10px] text-slate-400 px-1 select-none min-w-[45px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>

              {/* Zoom In */}
              <button
                onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.15))}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>

              <div className="w-[1px] h-4 bg-white/10 mx-1 sm:mx-2" />

              {/* Print */}
              <button
                onClick={handlePrint}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Print Resume"
              >
                <Printer size={16} />
              </button>

              {/* Download */}
              <button
                onClick={handleDownload}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer relative"
                title="Download Resume"
              >
                {downloadState === 'success' ? (
                  <Check size={16} className="text-emerald-400 animate-scale-up" />
                ) : (
                  <Download size={16} className={downloadState === 'downloading' ? 'animate-bounce' : ''} />
                )}
              </button>

              {/* Toggle Height / Fullscreen */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <div className="w-[1px] h-4 bg-white/10 mx-1 sm:mx-2" />

              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-rose-500/10 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                title="Close Viewer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Main Viewer Area */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative min-h-[300px] overflow-hidden bg-[#050507]">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050507]/90">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-2 border-rose-500/10" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-rose-500 animate-spin" />
                </div>
                <span className="font-mono text-xs text-slate-500 mt-4 uppercase tracking-widest">
                  Rendering Resume...
                </span>
              </div>
            )}

            <div className="w-full h-full flex items-center justify-center max-w-5xl mx-auto overflow-hidden">
              <div
                className={`relative transition-all duration-300 w-full rounded-xl bg-[#0d0d11] border border-white/5 shadow-2xl overflow-auto flex justify-center items-start ${
                  isFullscreen ? 'h-[85vh]' : 'h-[65vh] sm:h-[70vh] md:h-[75vh]'
                }`}
              >
                <div 
                  className="w-full h-full min-h-[600px] transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top center',
                  }}
                >
                  <iframe
                    ref={iframeRef}
                    src="/assets/Raviraj_Choughule_Resume.pdf#toolbar=0"
                    className="w-full h-full border-none"
                    onLoad={() => setIsLoading(false)}
                    title="Raviraj Choughule Resume"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-white/5 bg-[#0d0d11]/80 backdrop-blur-sm py-4 px-6">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Need a print copy or offline access? You can download or print directly from the controls above.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={handleDownload}
                  className="btn-resume-download text-xs h-9 px-6 font-semibold select-none flex items-center gap-2"
                >
                  {downloadState === 'success' ? (
                    <>
                      <Check size={13} /> Saved!
                    </>
                  ) : (
                    <>
                      <Download size={13} /> {downloadState === 'downloading' ? 'Downloading...' : 'Download PDF'}
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="btn-border-gradient text-xs h-9 px-6 border-white/10 hover:border-slate-500/30 hover:text-white cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
