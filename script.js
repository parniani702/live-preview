const livePreviewFrame = document.getElementById('live-preview');
const htmlEditor = document.getElementById('html');
const cssEditor = document.getElementById('css');
const jsEditor = document.getElementById('js');

const initializeLivePreview = () => {
    const doc = livePreviewFrame.contentWindow.document;
    doc.body.innerHTML = '';
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'live-preview-style');
    doc.head.appendChild(styleElement);
    const pagedJsScript = document.createElement('script');
    pagedJsScript.src = 'https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js';
    doc.head.appendChild(pagedJsScript);
};

const updateLiveHTMLPreview = (codeEditors) => {
    const doc = livePreviewFrame.contentWindow.document;
    doc.body.innerHTML = codeEditors.html.getValue();
};

const updateLiveCSSPreview = (codeEditors) => {
    const doc = livePreviewFrame.contentWindow.document;
    const styleElement = doc.getElementById('live-preview-style');
    if (styleElement) {
        styleElement.innerHTML = codeEditors.css.getValue();
    }
};

const updateLiveJSPreview = (codeEditors) => {
    const doc = livePreviewFrame.contentWindow.document;
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = codeEditors.js.getValue();
    doc.body.appendChild(scriptElement);
};

const initializeCodeEditors = () => {
    const getDefaultOptions = (object) => {
        const defaultOptions = {
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'panda-syntax'
        };
        if (object) {
            Object.keys(object).forEach(key => {
                defaultOptions[key] = object[key];
            });
        }
        return defaultOptions;
    };

    return {
        html: CodeMirror(htmlEditor, getDefaultOptions({
            mode: 'text/html',
            value: ''
        })),
        css: CodeMirror(cssEditor, getDefaultOptions({
            mode: 'css',
            value: '',
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            hintOptions: {
                completeSingle: false,
                closeOnUnfocus: false
            }
        })),
        js: CodeMirror(jsEditor, getDefaultOptions({
            mode: 'javascript',
            value: ''
        }))
    };
};

const setupLivePreviewStudio = () => {
    const codeEditors = initializeCodeEditors();
    CodeMirror.on(codeEditors.html, 'change', () => updateLiveHTMLPreview(codeEditors));
    CodeMirror.on(codeEditors.css, 'change', () => updateLiveCSSPreview(codeEditors));
    CodeMirror.on(codeEditors.js, 'change', () => updateLiveJSPreview(codeEditors));
};

document.addEventListener('DOMContentLoaded', () => {
    initializeLivePreview();
    setupLivePreviewStudio();
});
