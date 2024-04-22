import { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import { MathJax } from "better-react-mathjax";


import PropTypes from 'prop-types';

MarkdownRenderer.propTypes = {
    filePath: PropTypes.string
}

function MarkdownRenderer({ filePath }) {
  const [markdownContent, setMarkdownContent] = useState(null);

  useEffect(() => {
    if(filePath != ""){
        import(filePath)
        .then(res => {
            fetch(res.default)
                .then(res => res.text(),console.log(res))
                .then(res => setMarkdownContent(res))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
});

  return (
    <>
      {markdownContent && 
      <MathJax dynamic hideUntilTypeset="every" className='markdown'>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </MathJax>}
    </>
  );
}

export default MarkdownRenderer;
