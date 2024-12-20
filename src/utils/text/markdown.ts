export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  return markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    
    // Bold and Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    
    // Lists
    .replace(/^\s*\n\*/gm, '<ul class="list-disc list-inside my-4">\n*')
    .replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n$2')
    .replace(/^\*(.+)/gm, '<li class="my-1">$1</li>')
    
    // Ordered Lists
    .replace(/^\s*\n\d\./gm, '<ol class="list-decimal list-inside my-4">\n1.')
    .replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n$2')
    .replace(/^\d\.(.+)/gm, '<li class="my-1">$1</li>')
    
    // Code blocks
    .replace(/```([^`]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>')
    
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
    
    // Blockquotes
    .replace(/^\> (.+)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 my-4 italic">$1</blockquote>')
    
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-t border-gray-300">')
    
    // Paragraphs
    .replace(/^\s*(\n)?(.+)/gm, function(m) {
      return /\<(\/)?(h|ul|ol|li|blockquote|pre|hr)/.test(m) ? m : '<p class="my-4">' + m + '</p>';
    })
    
    // Clean up extra paragraphs
    .replace(/<p><\/p>/g, '')
    
    // Line breaks
    .replace(/\n/g, '<br>');
}