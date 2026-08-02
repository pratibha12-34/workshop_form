import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, PlusCircle, Edit3, Mic, MicOff } from 'lucide-react';

export const TaskFormModal = ({ isOpen, onClose, onSave, taskToEdit = null }) => {
  const { lang, t } = useLanguage();

  const [title, setTitle] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const nextState = taskToEdit
      ? {
          title: taskToEdit.title || '',
          titleHi: taskToEdit.titleHi || '',
          description: taskToEdit.description || '',
          category: taskToEdit.category || 'Work',
          priority: taskToEdit.priority || 'Medium',
          dueDate: taskToEdit.dueDate || new Date().toISOString().split('T')[0]
        }
      : {
          title: '',
          titleHi: '',
          description: '',
          category: 'Work',
          priority: 'Medium',
          dueDate: new Date().toISOString().split('T')[0]
        };

    const timeoutId = window.setTimeout(() => {
      setTitle(nextState.title);
      setTitleHi(nextState.titleHi);
      setDescription(nextState.description);
      setCategory(nextState.category);
      setPriority(nextState.priority);
      setDueDate(nextState.dueDate);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [taskToEdit, isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const timeoutId = window.setTimeout(() => setVoiceStatus(''), 0);
      return () => window.clearTimeout(timeoutId);
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang === 'hi' ? 'hi' : 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ')
        .trim();

      if (transcript) {
        // Auto priority detection
        if (/high|urgent|important|उच्च|जरूरी/i.test(transcript)) setPriority('High');
        else if (/low|minor|कम|आसान/i.test(transcript)) setPriority('Low');

        // Auto category detection
        if (/health|yoga|exercise|gym|स्वास्थ्य|योग/i.test(transcript)) setCategory('Health');
        else if (/mission|freedom|देश|राष्ट्र|मिशन/i.test(transcript)) setCategory('Mission');
        else if (/personal|home|family|व्यक्तिगत|घर/i.test(transcript)) setCategory('Personal');

        const cleanedTitle = transcript
          .replace(/^(add|create)\s+(task|todo)\s*/i, '')
          .trim();

        setTitle(cleanedTitle || transcript);
        setDescription(transcript);
        setVoiceStatus(t('voiceCaptured'));
      }
    };

    recognition.onerror = () => {
      setVoiceStatus(t('voiceNotSupported'));
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [lang, t]);

  if (!isOpen) return null;

  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      setVoiceStatus(t('voiceNotSupported'));
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
      setVoiceStatus(t('voiceListening'));
    } catch {
      setVoiceStatus(t('voiceNotSupported'));
      setIsListening(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: taskToEdit ? taskToEdit.id : undefined,
      title: title.trim(),
      titleHi: titleHi.trim() || title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate
    });

    onClose();
  };

  return (
    <div className="modal-overlay-backdrop" onClick={onClose}>
      <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            {taskToEdit ? <Edit3 size={20} /> : <PlusCircle size={20} />}
            <h3>{taskToEdit ? t('editTask') : t('addTask')}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="form-group">
            <label className="form-label">{t('voiceInput')}</label>
            <div className="voice-input-row">
              <button
                type="button"
                className={`voice-action-btn ${isListening ? 'listening' : ''}`}
                onClick={startVoiceInput}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                <span>{isListening ? t('stopListening') : t('startListening')}</span>
              </button>
              <span className={`voice-status-pill ${isListening ? 'listening' : ''}`}>
                {voiceStatus || t('voiceHint')}
              </span>
            </div>
          </div>

          {/* Title English */}
          <div className="form-group">
            <label className="form-label">{t('taskTitle')} (English) *</label>
            <input
              type="text"
              className="form-control-input"
              placeholder={t('taskTitlePlaceholder')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Title Hindi */}
          <div className="form-group">
            <label className="form-label">{t('taskTitle')} (हिन्दी - optional)</label>
            <input
              type="text"
              className="form-control-input"
              placeholder="उदा., सुबह का योग और ध्यान"
              value={titleHi}
              onChange={(e) => setTitleHi(e.target.value)}
            />
          </div>

          {/* Category & Priority Row */}
          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">{t('category')}</label>
              <select
                className="form-control-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Work">{t('work')}</option>
                <option value="Personal">{t('personal')}</option>
                <option value="Health">{t('health')}</option>
                <option value="Mission">{t('mission')}</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t('priority')}</label>
              <select
                className="form-control-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">{t('high')}</option>
                <option value="Medium">{t('medium')}</option>
                <option value="Low">{t('low')}</option>
              </select>
            </div>
          </div>

          {/* Due Date & Description */}
          <div className="form-group">
            <label className="form-label">{t('dueDate')}</label>
            <input
              type="date"
              className="form-control-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('description')}</label>
            <textarea
              className="form-control-textarea"
              rows="3"
              placeholder="Add key notes or goals..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="modal-footer-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              {t('cancel')}
            </button>
            <button type="submit" className="btn-primary-tiranga">
              {t('saveTask')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
