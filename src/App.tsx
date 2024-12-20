import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { PDFTools } from './pages/PDFTools';
import { ImageTools } from './pages/ImageTools';
import { TextTools } from './pages/TextTools';
import { MediaTools } from './pages/MediaTools';
import { DevTools } from './pages/DevTools';
import { QRTools } from './pages/QRTools';
import { UtilityTools } from './pages/UtilityTools';

// Resource Pages
import { Blog } from './pages/resources/Blog';
import { Tutorials } from './pages/resources/Tutorials';
import { FAQ } from './pages/resources/FAQ';
import { APIDocumentation } from './pages/resources/APIDocumentation';

// Legal Pages
import { Contact } from './pages/legal/Contact';
import { CookiePolicy } from './pages/legal/CookiePolicy';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';

// Text Tools
import { WordCounter } from './pages/tools/text/WordCounter';
import { CaseConverter } from './pages/tools/text/CaseConverter';
import { DuplicateRemover } from './pages/tools/text/DuplicateRemover';
import { TextToHtml } from './pages/tools/text/TextToHtml';
import { JsonFormatter } from './pages/tools/text/JsonFormatter';
import { MarkdownEditor } from './pages/tools/text/MarkdownEditor';
import { TextDiff } from './pages/tools/text/TextDiff';
import { SlugGenerator } from './pages/tools/text/SlugGenerator';
import { LoremIpsum } from './pages/tools/text/LoremIpsum';
import { TextEncoder } from './pages/tools/text/TextEncoder';
import { StringManipulator } from './pages/tools/text/StringManipulator';

// PDF Tools
import { PDFToWord } from './pages/tools/pdf/PDFToWord';
import { PDFToExcel } from './pages/tools/pdf/PDFToExcel';
import { PDFMerger } from './pages/tools/pdf/PDFMerger';
import { PDFSplitter } from './pages/tools/pdf/PDFSplitter';
import { PDFCompressor } from './pages/tools/pdf/PDFCompressor';

// Image Tools
import { ImageMetadataViewer } from './pages/tools/image/ImageMetadata';
import { ImageConverter } from './pages/tools/image/ImageConverter';
import { ImageResizer } from './pages/tools/image/ImageResizer';
import { ImageCompressor } from './pages/tools/image/ImageCompressor';
import { ImageCrop } from './pages/tools/image/ImageCrop';
import { ImageEditor } from './pages/tools/image/ImageEditor';

// Media Tools
import { VideoToMP3 } from './pages/tools/media/VideoToMP3';
import { VideoCompressor } from './pages/tools/media/VideoCompressor';
import { VideoCutter } from './pages/tools/media/VideoCutter';
import { AudioTrimmer } from './pages/tools/media/AudioTrimmer';

// Dev Tools
import { HtmlFormatter } from './pages/tools/dev/HtmlFormatter';
import { CSSFormatter } from './pages/tools/dev/CSSFormatter';
import { JSFormatter } from './pages/tools/dev/JSFormatter';
import { JsonValidator } from './pages/tools/dev/JsonValidator';
import { CodeMinifier } from './pages/tools/dev/CodeMinifier';
import { DiffChecker } from './pages/tools/dev/DiffChecker';
import { SQLFormatter } from './pages/tools/dev/SQLFormatter';
import { RegexTester } from './pages/tools/dev/RegexTester';

// QR Tools
import { QRGenerator } from './pages/tools/qr/QRGenerator';
import { QRScanner } from './pages/tools/qr/QRScanner';

// Utility Tools
import { PasswordGenerator } from './pages/tools/utility/PasswordGenerator';
import { Base64Tool } from './pages/tools/utility/Base64Tool';
import { HashGenerator } from './pages/tools/utility/HashGenerator';
import { ColorConverter } from './pages/tools/utility/ColorConverter';
import { UUIDGenerator } from './pages/tools/utility/UUIDGenerator';
import { TimestampConverter } from './pages/tools/utility/TimestampConverter';
import { JWTDecoder } from './pages/tools/utility/JWTDecoder';
import { CronParser } from './pages/tools/utility/CronParser';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/pdf" element={<PDFTools />} />
          <Route path="/image" element={<ImageTools />} />
          <Route path="/text" element={<TextTools />} />
          <Route path="/media" element={<MediaTools />} />
          <Route path="/dev" element={<DevTools />} />
          <Route path="/qr" element={<QRTools />} />
          <Route path="/utility" element={<UtilityTools />} />

          {/* Resource Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/api" element={<APIDocumentation />} />

          {/* Legal Routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* Text Tools Routes */}
          <Route path="/text/word-counter" element={<WordCounter />} />
          <Route path="/text/case-converter" element={<CaseConverter />} />
          <Route path="/text/duplicate-remover" element={<DuplicateRemover />} />
          <Route path="/text/text-to-html" element={<TextToHtml />} />
          <Route path="/text/json-formatter" element={<JsonFormatter />} />
          <Route path="/text/markdown-editor" element={<MarkdownEditor />} />
          <Route path="/text/text-diff" element={<TextDiff />} />
          <Route path="/text/slug-generator" element={<SlugGenerator />} />
          <Route path="/text/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="/text/encoder" element={<TextEncoder />} />
          <Route path="/text/manipulator" element={<StringManipulator />} />

          {/* PDF Tools Routes */}
          <Route path="/pdf/to-word" element={<PDFToWord />} />
          <Route path="/pdf/to-excel" element={<PDFToExcel />} />
          <Route path="/pdf/merge" element={<PDFMerger />} />
          <Route path="/pdf/split" element={<PDFSplitter />} />
          <Route path="/pdf/compress" element={<PDFCompressor />} />

          {/* Image Tools Routes */}
          <Route path="/image/metadata" element={<ImageMetadataViewer />} />
          <Route path="/image/convert" element={<ImageConverter />} />
          <Route path="/image/resize" element={<ImageResizer />} />
          <Route path="/image/compress" element={<ImageCompressor />} />
          <Route path="/image/crop" element={<ImageCrop />} />
          <Route path="/image/editor" element={<ImageEditor />} />

          {/* Media Tools Routes */}
          <Route path="/media/video-to-mp3" element={<VideoToMP3 />} />
          <Route path="/media/compress-video" element={<VideoCompressor />} />
          <Route path="/media/video-cutter" element={<VideoCutter />} />
          <Route path="/media/audio-cutter" element={<AudioTrimmer />} />

          {/* Dev Tools Routes */}
          <Route path="/dev/html-formatter" element={<HtmlFormatter />} />
          <Route path="/dev/css-formatter" element={<CSSFormatter />} />
          <Route path="/dev/js-formatter" element={<JSFormatter />} />
          <Route path="/dev/json-validator" element={<JsonValidator />} />
          <Route path="/dev/minify" element={<CodeMinifier />} />
          <Route path="/dev/diff-checker" element={<DiffChecker />} />
          <Route path="/dev/sql-formatter" element={<SQLFormatter />} />
          <Route path="/dev/regex-tester" element={<RegexTester />} />

          {/* QR Tools Routes */}
          <Route path="/qr/generate" element={<QRGenerator />} />
          <Route path="/qr/scan" element={<QRScanner />} />

          {/* Utility Tools Routes */}
          <Route path="/utility/password-generator" element={<PasswordGenerator />} />
          <Route path="/utility/base64" element={<Base64Tool />} />
          <Route path="/utility/hash-generator" element={<HashGenerator />} />
          <Route path="/utility/color-converter" element={<ColorConverter />} />
          <Route path="/utility/uuid-generator" element={<UUIDGenerator />} />
          <Route path="/utility/timestamp-converter" element={<TimestampConverter />} />
          <Route path="/utility/jwt-decoder" element={<JWTDecoder />} />
          <Route path="/utility/cron-parser" element={<CronParser />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}