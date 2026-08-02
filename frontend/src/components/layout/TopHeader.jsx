import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Calendar, Plus, Mic, MicOff } from 'lucide-react';

export const TopHeader = ({ searchQuery, setSearchQuery, onOpenAddTask, onVoiceAddTask }) => {
  const { lang, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [voiceNotification, setVoiceNotification] = useState('');
  const recognitionRef = useRef(null);

  const todayDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang === 'hi' ? 'hi' : 'en-US';

    const processVoiceCommand = (text) => {
      if (!text) return;

      let priority = 'Medium';
      if (/high|urgent|important|उच्च|जरूरी/i.test(text)) priority = 'High';
      else if (/low|minor|कम|आसान/i.test(text)) priority = 'Low';

      let category = 'Work';
      if (/health|yoga|exercise|gym|स्वास्थ्य|योग/i.test(text)) category = 'Health';
      else if (/mission|freedom|देश|राष्ट्र|मिशन/i.test(text)) category = 'Mission';
      else if (/personal|home|family|व्यक्तिगत|घर/i.test(text)) category = 'Personal';

      let cleanTitle = text
        .replace(/^(add|create|new)\s+(task|todo|goal)?\s*/i, '')
        .replace(/^(नया|टास्क|काम)\s+(जोड़ें|बनाएं)?\s*/i, '')
        .replace(/\s*(with|with priority|priority|श्रेणी|प्राथमिकता)\s*(high|medium|low|urgent|work|health|personal|mission|उच्च|कम)?$/i, '')
        .trim();

      if (!cleanTitle) cleanTitle = text;

      if (onVoiceAddTask) {
        onVoiceAddTask({
          title: cleanTitle,
          category,
          priority,
          description: `Voice input: "${text}"`
        });
        setVoiceNotification(`Task Added: "${cleanTitle}" 🎙️`);
        setTimeout(() => setVoiceNotification(''), 4000);
      }
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('')
        .trim();

      if (event.results[0].isFinal) {
        processVoiceCommand(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Voice recognition error:', event.error);
      setIsListening(false);
      setVoiceNotification(t('voiceNotSupported') || 'Voice error');
      setTimeout(() => setVoiceNotification(''), 3000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [lang, t, onVoiceAddTask]);

  const toggleVoiceListen = () => {
    if (!recognitionRef.current) {
      alert(t('voiceNotSupported') || 'Web Speech API is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setVoiceNotification(t('voiceListening') || 'Listening for task...');
      } catch {
        setIsListening(false);
      }
    }
  };

  return (
    <header className="top-header">
      {/* Search Bar */}
      <div className="search-bar-container">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
            ✕
          </button>
        )}
      </div>

      {/* Header Right Actions */}
      <div className="header-right-actions">
        {voiceNotification && (
          <div className="voice-header-toast">
            {voiceNotification}
          </div>
        )}

        {/* Date Display */}
        <div className="header-date-pill">
          <Calendar className="date-icon" size={16} />
          <span>{todayDate}</span>
        </div>

        {/* Quick Voice Task Button */}
        <button
          className={`btn-voice-header ${isListening ? 'listening' : ''}`}
          onClick={toggleVoiceListen}
          title="Add Task using Voice"
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          <span>{isListening ? (lang === 'hi' ? 'सुन रहा है...' : 'Listening...') : (lang === 'hi' ? 'वॉइस कार्य' : 'Voice Add')}</span>
        </button>

        {/* Quick Add Task Button */}
        <button className="btn-primary-tiranga" onClick={onOpenAddTask}>
          <Plus size={18} />
          <span>{t('addTask')}</span>
        </button>

        {/* User Profile Avatar */}
        <div className="user-profile-badge">
          <div className="avatar-circle">aarav</div>
          <div className="user-info">
            <span className="user-name">Aarav Sharma</span>
            <span className="user-role">Patriot Leader</span>
          </div>
        </div>
      </div>
    </header>
  );
};
