import React from 'react';
import './KeywordSelector.css'; // Import CSS for KeywordSelector

interface KeywordSelectorProps {
  keywords: string[];
  selectedKeywords: string[];
  onKeywordChange: (newKeywords: string[]) => void;
}

const KeywordSelector: React.FC<KeywordSelectorProps> = ({ keywords, selectedKeywords, onKeywordChange }) => {
  const handleKeywordToggle = (keyword: string) => {
    const updatedKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter((k) => k !== keyword)
      : [...selectedKeywords, keyword];

    if (updatedKeywords.length <= 3) {
      onKeywordChange(updatedKeywords);
    }
  };

  return (
    <div className="keywords">
      {keywords.map((keyword) => (
        <button
          key={keyword}
          type="button"
          className={`keyword-button ${selectedKeywords.includes(keyword) ? 'selected' : ''}`}
          onClick={() => handleKeywordToggle(keyword)}
          disabled={!selectedKeywords.includes(keyword) && selectedKeywords.length >= 3}
        >
          {keyword}
        </button>
      ))}
    </div>
  );
};

export default KeywordSelector;
