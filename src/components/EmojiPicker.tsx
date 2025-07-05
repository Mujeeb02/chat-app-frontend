'use client';

import { useState, useRef, useEffect } from 'react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

// Organized emoji categories
const EMOJI_CATEGORIES = {
  'Smileys & Emotion': [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😯', '😦', '😧',
    '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢',
    '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '💩', '👻', '💀',
    '☠️', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽',
    '🙀', '😿', '😾', '🙈', '🙉', '🙊'
  ],
  'People & Body': [
    '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️',
    '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💯', '💢',
    '💥', '💫', '💦', '💨', '🕳️', '💬', '🗨️', '🗯️', '💭', '💤',
    '💋', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️',
    '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️',
    '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲',
    '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻',
    '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅', '👄',
    '💋', '🩸', '🫂', '👶', '👧', '🧒', '👦', '👩', '🧑', '👨'
  ],
  'Animals & Nature': [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨',
    '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
    '🐔', '🐧', '🐦', '🐤', '🐣', '🦆', '🦅', '🦉', '🦇', '🐺',
    '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟',
    '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙',
    '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋',
    '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏',
    '🐪', '🐫', '🦙', '🦒', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏',
    '🐑', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓'
  ],
  'Food & Drink': [
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈',
    '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
    '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔',
    '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈',
    '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟',
    '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕',
    '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤',
    '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨',
    '🍦', '🍰', '🎂', '🧁', '🥧', '🍮', '🍭', '🍬', '🍫', '🍿'
  ],
  'Activities': [
    '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱',
    '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳',
    '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷️', '⛸️',
    '🥌', '🎿', '⛷️', '🏂', '🏋️‍♀️', '🏋️', '🏋️‍♂️', '🤼‍♀️', '🤼', '🤼‍♂️',
    '⛹️‍♀️', '⛹️', '⛹️‍♂️', '🤺', '🤾‍♀️', '🤾', '🤾‍♂️', '🏌️‍♀️', '🏌️', '🏌️‍♂️',
    '🏇', '🧘‍♀️', '🧘', '🧘‍♂️', '🏄‍♀️', '🏄', '🏄‍♂️', '🏊‍♀️', '🏊', '🏊‍♂️',
    '🤽‍♀️', '🤽', '🤽‍♂️', '🚣‍♀️', '🚣', '🚣‍♂️', '🧗‍♀️', '🧗', '🧗‍♂️', '🚵‍♀️',
    '🚵', '🚵‍♂️', '🚴‍♀️', '🚴', '🚴‍♂️', '🏆', '🥇', '🥈', '🥉', '🏅',
    '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹‍♀️', '🤹', '🤹‍♂️', '🎭'
  ],
  'Travel & Places': [
    '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
    '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️', '🚨', '🚔', '🚍',
    '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄',
    '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬',
    '🛩️', '💺', '🛰️', '🚀', '🛸', '🚁', '🛶', '⛵', '🚤', '🛥️',
    '🛳️', '⛴️', '🚢', '⚓', '🚧', '⛽', '🚏', '🚦', '🚥', '🗺️',
    '🗿', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲',
    '⛱️', '🏖️', '🏝️', '🏔️', '⛰️', '🌋', '🗻', '🏕️', '⛺', '🏠',
    '🏡', '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥'
  ],
  'Objects': [
    '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️',
    '🎮', '🕰️', '⏰', '⏲️', '⏱️', '🕛', '🕧', '🕐', '🕜', '🕑',
    '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕡', '🕖',
    '🕢', '🕗', '🕣', '🕘', '🕤', '🕙', '🕥', '🕚', '🕦', '🕙',
    '📞', '📟', '📠', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯',
    '🛢️', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '🪙', '💳',
    '💎', '⚖️', '🪜', '🧰', '🪛', '🔧', '🔨', '⚒️', '🛠️', '⛏️',
    '🪚', '🔩', '⚙️', '🪤', '🧱', '🪨', '🪵', '🛖', '🏠', '🏡',
    '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦'
  ],
  'Symbols': [
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
    '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐',
    '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐',
    '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳',
    '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️',
    '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️',
    '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️',
    '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓'
  ]
};

const CATEGORY_ICONS = {
  'Smileys & Emotion': '😀',
  'People & Body': '👋',
  'Animals & Nature': '🐶',
  'Food & Drink': '🍎',
  'Activities': '⚽',
  'Travel & Places': '🚗',
  'Objects': '⌚',
  'Symbols': '❤️'
};

export default function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Smileys & Emotion');
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load recent emojis from localStorage
    const saved = localStorage.getItem('recent-emojis');
    if (saved) {
      setRecentEmojis(JSON.parse(saved));
    }

    // Handle click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    
    // Add to recent emojis
    const newRecent = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 20);
    setRecentEmojis(newRecent);
    localStorage.setItem('recent-emojis', JSON.stringify(newRecent));
  };

  const getFilteredEmojis = () => {
    if (searchTerm) {
      // Search across all categories
      const allEmojis = Object.values(EMOJI_CATEGORIES).flat();
      return allEmojis.filter(emoji => 
        emoji.includes(searchTerm) || 
        emoji.charCodeAt(0).toString(16).includes(searchTerm.toLowerCase())
      );
    }
    return EMOJI_CATEGORIES[selectedCategory as keyof typeof EMOJI_CATEGORIES] || [];
  };

  const filteredEmojis = getFilteredEmojis();

  return (
    <div 
      ref={pickerRef}
      className="absolute bottom-full mb-2 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 p-4 w-80 max-h-96 overflow-hidden backdrop-blur-sm"
      style={{ animation: 'slideUp 0.3s ease-out' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Emoji
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Categories */}
      {!searchTerm && (
        <div className="flex space-x-1 mb-4 overflow-x-auto pb-2">
          {Object.entries(CATEGORY_ICONS).map(([category, icon]) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={category}
            >
              <span className="text-lg">{icon}</span>
            </button>
          ))}
        </div>
      )}

      {/* Recent Emojis */}
      {!searchTerm && recentEmojis.length > 0 && selectedCategory === 'Smileys & Emotion' && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent</h4>
          <div className="grid grid-cols-8 gap-1">
            {recentEmojis.slice(0, 16).map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-lg"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Emoji Grid */}
      <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto custom-scrollbar">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleEmojiClick(emoji)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 text-lg transform hover:scale-110"
            title={emoji}
          >
            {emoji}
          </button>
        ))}
      </div>

      {filteredEmojis.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">🔍</div>
          <p>No emojis found</p>
        </div>
      )}
    </div>
  );
} 