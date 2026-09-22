import http from 'http';
import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

console.log('Verifying index.html contents:');
console.log('- Has PDF.js script tag:', html.includes('pdf.min.js'));
console.log('- Has Mammoth.js script tag:', html.includes('mammoth.browser.min.js'));
console.log('- Has resume-modal overlay:', html.includes('id="resume-modal"'));
console.log('- Has resume-dropzone:', html.includes('id="resume-dropzone"'));
console.log('- Has resume-file-input:', html.includes('id="resume-file-input"'));
console.log('- Has btn-browse-file:', html.includes('id="btn-browse-file"'));
console.log('- Has uploaded-file-card:', html.includes('id="uploaded-file-card"'));
console.log('- Has resume-target-role select:', html.includes('id="resume-target-role"'));
console.log('- Has resume-ats-score-display:', html.includes('id="resume-ats-score-display"'));
console.log('- Has resume-keywords-chips:', html.includes('id="resume-keywords-chips"'));
console.log('- Has tab-btn-file-upload:', html.includes('id="tab-btn-file-upload"'));
console.log('- Has tab-btn-gdrive:', html.includes('id="tab-btn-gdrive"'));

const css = fs.readFileSync('css/components.css', 'utf8');
console.log('\nVerifying css/components.css contents:');
console.log('- Has .resume-upload-dropzone:', css.includes('.resume-upload-dropzone'));
console.log('- Has .uploaded-file-card:', css.includes('.uploaded-file-card'));
console.log('- Has .ats-chip:', css.includes('.ats-chip'));

if (
  html.includes('pdf.min.js') &&
  html.includes('mammoth.browser.min.js') &&
  html.includes('id="resume-dropzone"') &&
  html.includes('id="resume-file-input"') &&
  html.includes('id="uploaded-file-card"') &&
  css.includes('.resume-upload-dropzone')
) {
  console.log('\nSUCCESS: All critical HTML and CSS components verified!');
} else {
  console.error('\nFAILURE: Missing components.');
  process.exit(1);
}
