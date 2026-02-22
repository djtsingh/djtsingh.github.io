<script>
  import SEO from '$lib/components/SEO.svelte';
  import { onMount } from 'svelte';

  const project = {
    title: 'DrishT',
    subtitle: 'A Dual-Stream Mobile Architecture for Real-Time Scene Understanding in Assistive Navigation',
    authors: 'Daljeet Singh Lotey, Narayan Kulkarni',
    affiliation: 'Amity Institute of Information Technology, Amity University Maharashtra, Mumbai, India',
    year: '2025',
    doi: 'https://doi.org/10.22541/au.176843166.60388360/v1',
    doiShort: '10.22541/au.176843166.60388360/v1',
    links: {
      thesis: '/projects/DrishT_Thesis.pdf',
      paper: '/projects/DrishT_Paper.pdf',
      paperMd: '/projects/DrishT_Paper.md'
    }
  };

  const abstract = `Autonomous navigation for visually impaired individuals requires simultaneous interpretation of spatial objects and contextual text—capabilities that existing systems address in isolation or require expensive dedicated hardware. We present DrishT, a mobile-optimized dual-stream architecture combining Single Shot MultiBox Detector (SSD) with VGG16 backbone for object detection and Convolutional Recurrent Neural Network (CRNN) for scene text recognition. Our system achieves 41.2% mAP@0.5 for object detection and 91.5% word-level accuracy for text recognition with 182ms end-to-end latency on mid-range Android devices (Snapdragon 660+). The key contribution is a semantic fusion layer that establishes spatial-textual correspondences through distance-weighted attention, achieving 84.3% accuracy in associating detected objects with embedded text labels. Through systematic optimization using TensorFlow Lite INT8 quantization, we reduce the combined model size to 14.5 MB (76% reduction from FP32) with only 1.8% mAP degradation.`;

  const keywords = ['Assistive Technology', 'Computer Vision', 'Object Detection', 'OCR', 'Mobile Deep Learning', 'Real-time Systems', 'Accessibility'];

  const metrics = [
    { value: '41.2%', label: 'mAP@0.5', detail: 'Object Detection', icon: '🎯' },
    { value: '91.5%', label: 'Word Accuracy', detail: 'Text Recognition', icon: '📝' },
    { value: '182ms', label: 'Latency', detail: 'End-to-End', icon: '⚡' },
    { value: '84.3%', label: 'MAS', detail: 'Semantic Fusion', icon: '🔗' },
    { value: '14.5MB', label: 'Model Size', detail: '76% Reduction', icon: '📦' },
    { value: '<$200', label: 'Device Cost', detail: 'Accessibility', icon: '💰' }
  ];

  const tableData = {
    detection: [
      { model: 'Faster R-CNN', backbone: 'ResNet-50', map: '52.3', latency: '1,420', size: '522' },
      { model: 'YOLOv3', backbone: 'Darknet-53', map: '38.9', latency: '244', size: '246' },
      { model: 'SSD', backbone: 'MobileNetV2', map: '32.1', latency: '128', size: '11.3' },
      { model: 'SSD', backbone: 'VGG16 (FP32)', map: '43.0', latency: '237', size: '61.0' },
      { model: 'DrishT (INT8)', backbone: 'VGG16', map: '41.2', latency: '182', size: '14.5', highlight: true }
    ],
    ocr: [
      { model: 'Tesseract 4.0', wordAcc: '67.2', cer: '18.4', latency: '340', size: '85.0' },
      { model: 'PaddleOCR', wordAcc: '92.5', cer: '3.8', latency: '210', size: '8.6' },
      { model: 'CRNN (FP32)', wordAcc: '93.2', cer: '3.2', latency: '184', size: '28.4' },
      { model: 'DrishT CRNN (INT8)', wordAcc: '91.5', cer: '4.1', latency: '150', size: '6.8', highlight: true }
    ],
    comparison: [
      { feature: 'Offline Operation', orcam: '✓', seeingai: '✗', lookout: 'Partial', drisht: '✓' },
      { feature: 'Real-time (<200ms)', orcam: '✓', seeingai: '✗', lookout: '✓', drisht: '✓' },
      { feature: 'Semantic Fusion', orcam: 'Limited', seeingai: '✗', lookout: 'Limited', drisht: '✓' },
      { feature: 'Device Cost', orcam: '$3,500', seeingai: '$200-1000', lookout: '$200-1000', drisht: '<$200' },
      { feature: 'Open Source', orcam: '✗', seeingai: '✗', lookout: '✗', drisht: '✓' }
    ]
  };

  const contributions = [
    {
      num: '01',
      title: 'Dual-Stream Architecture with Semantic Fusion',
      desc: 'Novel fusion mechanism combining SSD-based object detection with CRNN-based text recognition, establishing spatial correspondences using distance-weighted attention. Achieves 84.3% accuracy in object-text association—a 12.7% absolute improvement over independent pipeline baselines.',
      color: 'var(--blue)'
    },
    {
      num: '02',
      title: 'Mobile-Optimized Implementation',
      desc: 'Through systematic INT8 quantization and architecture selection, we achieve 182ms end-to-end latency with 14.5MB combined model size on Snapdragon 660 processors—enabling real-time operation on devices costing under $200.',
      color: 'var(--green)'
    },
    {
      num: '03',
      title: 'Comprehensive Evaluation Framework',
      desc: 'Quantitative results on 10,000+ images spanning object detection, text recognition, and semantic fusion tasks, with detailed ablation studies on quantization impact and architecture choices.',
      color: 'var(--peach)'
    },
    {
      num: '04',
      title: 'Open Research Direction',
      desc: 'Identification of specific failure modes and proposed roadmap for future improvements, including unified multi-task architectures and extended language support for global accessibility.',
      color: 'var(--mauve)'
    }
  ];

  const techStack = [
    { name: 'TensorFlow Lite', category: 'framework', icon: '🧠' },
    { name: 'Python', category: 'language', icon: '🐍' },
    { name: 'OpenCV', category: 'library', icon: '👁️' },
    { name: 'SSD-VGG16', category: 'model', icon: '🔍' },
    { name: 'CRNN', category: 'model', icon: '📖' },
    { name: 'Android', category: 'platform', icon: '📱' },
    { name: 'INT8 Quantization', category: 'deployment', icon: '⚡' },
    { name: 'NumPy', category: 'library', icon: '🔢' }
  ];

  let showPaperPreview = false;
  let paperContent = '';
  let activeTab = 'detection';
  let mounted = false;

  onMount(async () => {
    mounted = true;
    try {
      const res = await fetch(project.links.paperMd);
      if (res.ok) {
        paperContent = await res.text();
      }
    } catch (e) {
      console.log('Paper preview not available');
    }
  });

  function togglePaperPreview() {
    showPaperPreview = !showPaperPreview;
  }
</script>

<SEO 
  title="DrishT: Assistive Navigation Research | Daljeet Singh"
  description="{project.subtitle} - Bachelor's thesis research combining computer vision and deep learning for accessibility"
  image="/projects/drisht-cover.svg"
  canonical="https://djtsingh.github.io/projects/drisht"
  type="article"
/>

<article class="research-page" class:mounted>
  <!-- Navigation -->
  <nav class="breadcrumb">
    <a href="/projects" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      All Projects
    </a>
  </nav>

  <!-- Hero Header -->
  <header class="paper-header">
    <h1 class="paper-title">
      <span class="title-main">{project.title}</span>
    </h1>
    <h2 class="paper-subtitle">{project.subtitle}</h2>
    
    <div class="author-block">
      <div class="author-info">
        <span class="author-names">{project.authors}</span>
        <span class="author-affiliation">{project.affiliation}</span>
      </div>
    </div>

    <div class="doi-container">
      <a href={project.doi} target="_blank" rel="noopener noreferrer" class="doi-badge">
        <div class="doi-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </div>
        <div class="doi-text">
          <span class="doi-label">DOI</span>
          <span class="doi-value">{project.doiShort}</span>
        </div>
        <div class="doi-arrow">→</div>
      </a>
    </div>

    <div class="paper-actions">
      <a href={project.links.thesis} class="action-btn action-btn--primary" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        Full Thesis
      </a>
      <a href={project.links.paper} class="action-btn action-btn--secondary" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        IEEE Paper
      </a>
      <button class="action-btn action-btn--ghost" on:click={togglePaperPreview}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 7 4 4 20 4 20 7"/>
          <line x1="9" y1="20" x2="15" y2="20"/>
          <line x1="12" y1="4" x2="12" y2="20"/>
        </svg>
        {showPaperPreview ? 'Hide' : 'View'} Source
      </button>
    </div>
  </header>

  <!-- Architecture Visualization -->
  <section class="architecture-section">
    <div class="architecture-wrapper">
      <div class="architecture-header">
        <span class="section-badge">System Architecture</span>
        <h3>Dual-Stream Processing Pipeline</h3>
      </div>
      <div class="architecture-container">
        <img src="/projects/drisht-cover.svg" alt="DrishT System Architecture - Dual-stream mobile architecture combining SSD object detection and CRNN text recognition with semantic fusion" class="architecture-diagram" />
      </div>
      <div class="architecture-caption">
        <p>Figure 1: DrishT system architecture showing parallel processing streams for object detection and text recognition, converging at the semantic fusion layer for contextual scene understanding.</p>
      </div>
    </div>
  </section>

  <!-- Metrics Dashboard -->
  <section class="metrics-section">
    <div class="section-header">
      <span class="section-badge">Performance</span>
      <h3>Key Metrics</h3>
      <p>Benchmarked on Snapdragon 660+ devices with 10,000+ test images</p>
    </div>
    <div class="metrics-grid">
      {#each metrics as metric, i}
        <div class="metric-card" style="--index: {i}; --accent-color: var(--accent)">
          <div class="metric-icon">{metric.icon}</div>
          <div class="metric-content">
            <div class="metric-value">{metric.value}</div>
            <div class="metric-label">{metric.label}</div>
            <div class="metric-detail">{metric.detail}</div>
          </div>
          <div class="metric-glow"></div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Abstract -->
  <section class="abstract-section">
    <div class="abstract-container">
      <div class="abstract-header">
        <span class="section-num">§1</span>
        <h3>Abstract</h3>
      </div>
      <div class="abstract-content">
        <p>{abstract}</p>
      </div>
      <div class="keywords-container">
        <span class="keywords-label">Keywords:</span>
        <div class="keywords-list">
          {#each keywords as keyword}
            <span class="keyword-tag">{keyword}</span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Contributions -->
  <section class="contributions-section">
    <div class="section-header">
      <span class="section-num">§2</span>
      <h3>Research Contributions</h3>
    </div>
    <div class="contributions-grid">
      {#each contributions as contrib, i}
        <div class="contribution-card" style="--accent: {contrib.color}; --index: {i}">
          <div class="contribution-header">
            <span class="contribution-num">{contrib.num}</span>
            <div class="contribution-line" style="background: {contrib.color}"></div>
          </div>
          <h4>{contrib.title}</h4>
          <p>{contrib.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Results Tables -->
  <section class="results-section">
    <div class="section-header">
      <span class="section-num">§3</span>
      <h3>Experimental Results</h3>
    </div>

    <div class="table-tabs">
      <button class="tab-btn" class:active={activeTab === 'detection'} on:click={() => activeTab = 'detection'}>
        Object Detection
      </button>
      <button class="tab-btn" class:active={activeTab === 'ocr'} on:click={() => activeTab = 'ocr'}>
        Text Recognition
      </button>
      <button class="tab-btn" class:active={activeTab === 'comparison'} on:click={() => activeTab = 'comparison'}>
        System Comparison
      </button>
    </div>

    {#if activeTab === 'detection'}
      <div class="table-container">
        <div class="table-title">
          <span class="table-icon">📊</span>
          <span>Table 1: Object Detection Performance Comparison</span>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Backbone</th>
                <th>mAP@0.5 (%)</th>
                <th>Latency (ms)</th>
                <th>Size (MB)</th>
              </tr>
            </thead>
            <tbody>
              {#each tableData.detection as row}
                <tr class:highlight={row.highlight}>
                  <td class="model-name">{row.model}</td>
                  <td>{row.backbone}</td>
                  <td class="numeric">{row.map}</td>
                  <td class="numeric">{row.latency}</td>
                  <td class="numeric">{row.size}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <p class="table-note">* Highlighted row indicates our proposed method. Latency measured on Snapdragon 660.</p>
      </div>
    {/if}

    {#if activeTab === 'ocr'}
      <div class="table-container">
        <div class="table-title">
          <span class="table-icon">📝</span>
          <span>Table 2: OCR Performance Comparison</span>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Word Acc. (%)</th>
                <th>CER (%)</th>
                <th>Latency (ms)</th>
                <th>Size (MB)</th>
              </tr>
            </thead>
            <tbody>
              {#each tableData.ocr as row}
                <tr class:highlight={row.highlight}>
                  <td class="model-name">{row.model}</td>
                  <td class="numeric">{row.wordAcc}</td>
                  <td class="numeric">{row.cer}</td>
                  <td class="numeric">{row.latency}</td>
                  <td class="numeric">{row.size}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <p class="table-note">* CER = Character Error Rate. Lower is better for CER.</p>
      </div>
    {/if}

    {#if activeTab === 'comparison'}
      <div class="table-container">
        <div class="table-title">
          <span class="table-icon">🔬</span>
          <span>Table 3: Comparison with Commercial Assistive Systems</span>
        </div>
        <div class="table-wrapper">
          <table class="data-table comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>OrCam MyEye</th>
                <th>Seeing AI</th>
                <th>Lookout</th>
                <th class="highlight-header">DrishT (Ours)</th>
              </tr>
            </thead>
            <tbody>
              {#each tableData.comparison as row}
                <tr>
                  <td class="feature-name">{row.feature}</td>
                  <td class="center">{row.orcam}</td>
                  <td class="center">{row.seeingai}</td>
                  <td class="center">{row.lookout}</td>
                  <td class="center highlight-cell">{row.drisht}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <p class="table-note">* DrishT achieves comparable or superior performance at significantly lower cost.</p>
      </div>
    {/if}
  </section>

  <!-- Tech Stack -->
  <section class="tech-section">
    <div class="section-header">
      <span class="section-num">§4</span>
      <h3>Technology Stack</h3>
    </div>
    <div class="tech-grid">
      {#each techStack as tech}
        <div class="tech-card" data-category={tech.category}>
          <span class="tech-icon">{tech.icon}</span>
          <span class="tech-name">{tech.name}</span>
          <span class="tech-category">{tech.category}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Paper Preview -->
  {#if showPaperPreview && paperContent}
    <section class="paper-preview-section">
      <div class="section-header">
        <span class="section-num">§5</span>
        <h3>Raw Paper Source (Markdown)</h3>
      </div>
      <div class="paper-preview">
        <div class="preview-header">
          <div class="preview-file">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span class="file-name">DrishT_Paper.md</span>
          </div>
          <a href={project.links.paperMd} download class="download-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </a>
        </div>
        <div class="preview-content">
          <pre><code>{paperContent.slice(0, 10000)}{paperContent.length > 10000 ? '\n\n... [Content truncated - Download full paper for complete text]' : ''}</code></pre>
        </div>
      </div>
    </section>
  {/if}

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="cta-decoration">
      <div class="cta-circle"></div>
      <div class="cta-circle"></div>
    </div>
    <div class="cta-content">
      <h3>Explore the Complete Research</h3>
      <p>Access the full thesis with implementation details, the IEEE-formatted research paper, or get in touch to discuss assistive AI innovations.</p>
      <div class="cta-actions">
        <a href={project.links.thesis} class="cta-btn cta-btn--primary" target="_blank" rel="noopener noreferrer">
          <span>📄</span> Full Thesis
        </a>
        <a href={project.doi} class="cta-btn cta-btn--secondary" target="_blank" rel="noopener noreferrer">
          <span>🔗</span> TechRxiv
        </a>
        <a href="/connect" class="cta-btn cta-btn--ghost">
          <span>💬</span> Connect
        </a>
      </div>
    </div>
  </section>
</article>

<style>
  .research-page {
    max-width: 1100px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .research-page.mounted {
    opacity: 1;
    transform: translateY(0);
  }

  /* Breadcrumb */
  .breadcrumb {
    margin-bottom: 2rem;
    padding-top: 1rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--subtext0);
    transition: all 0.2s ease;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    margin-left: -0.75rem;
  }

  .back-link:hover {
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
  }

  /* Header */
  .paper-header {
    text-align: center;
    padding: 2rem 0 3rem;
    border-bottom: 1px solid var(--surface0);
    margin-bottom: 3rem;
    position: relative;
  }

  .paper-title {
    margin: 0 0 1rem;
  }

  .title-main {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, var(--text) 0%, var(--accent) 50%, var(--mauve) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
  }

  .paper-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    font-weight: 400;
    color: var(--subtext0);
    margin: 0 0 2rem;
    line-height: 1.6;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .author-block {
    margin-bottom: 1.5rem;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .author-names {
    font-size: 1rem;
    color: var(--text);
    font-weight: 500;
  }

  .author-affiliation {
    font-size: 0.85rem;
    color: var(--subtext0);
    font-style: italic;
  }

  .doi-container {
    margin-bottom: 2rem;
  }

  .doi-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-lg);
    transition: all 0.3s ease;
  }

  .doi-badge:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .doi-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(var(--accent-rgb), 0.15);
    border-radius: var(--radius-md);
    color: var(--accent);
  }

  .doi-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .doi-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--subtext0);
  }

  .doi-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: var(--accent);
  }

  .doi-arrow {
    color: var(--subtext0);
    transition: transform 0.2s ease;
  }

  .doi-badge:hover .doi-arrow {
    transform: translateX(4px);
    color: var(--accent);
  }

  .paper-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
  }

  .action-btn--primary {
    background: var(--accent);
    color: var(--mantle);
  }

  .action-btn--primary:hover {
    filter: brightness(1.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.4);
  }

  .action-btn--secondary {
    background: var(--surface0);
    color: var(--text);
    border: 1px solid var(--surface1);
  }

  .action-btn--secondary:hover {
    background: var(--surface1);
    border-color: var(--accent);
  }

  .action-btn--ghost {
    background: transparent;
    color: var(--subtext0);
    border: 1px solid var(--surface1);
  }

  .action-btn--ghost:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
  }

  /* Architecture Section */
  .architecture-section {
    margin-bottom: 4rem;
  }

  .architecture-wrapper {
    background: var(--mantle);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .architecture-header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--surface0);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .architecture-header h3 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--text);
  }

  .section-badge {
    padding: 0.35rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(var(--accent-rgb), 0.15);
    color: var(--accent);
    border-radius: var(--radius-sm);
  }

  .architecture-container {
    padding: 2rem;
    background: var(--base);
  }

  .architecture-diagram {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--radius-md);
  }

  .architecture-caption {
    padding: 1rem 2rem 1.5rem;
    border-top: 1px solid var(--surface0);
  }

  .architecture-caption p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--subtext0);
    font-style: italic;
    text-align: center;
  }

  /* Metrics Section */
  .metrics-section {
    margin-bottom: 4rem;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .section-header h3 {
    margin: 0.75rem 0 0.5rem;
    font-size: 1.5rem;
    color: var(--text);
  }

  .section-header p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--subtext0);
  }

  .section-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .metric-card {
    position: relative;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-lg);
    padding: 1.5rem 1rem;
    text-align: center;
    transition: all 0.3s ease;
    overflow: hidden;
    animation: fadeInUp 0.5s ease forwards;
    animation-delay: calc(var(--index) * 0.08s);
    opacity: 0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .metric-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  .metric-card:hover .metric-glow {
    opacity: 1;
  }

  .metric-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(var(--accent-rgb), 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .metric-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .metric-content {
    position: relative;
    z-index: 1;
  }

  .metric-value {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 0.25rem;
  }

  .metric-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.25rem;
  }

  .metric-detail {
    font-size: 0.7rem;
    color: var(--subtext0);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Abstract */
  .abstract-section {
    margin-bottom: 4rem;
  }

  .abstract-container {
    background: linear-gradient(135deg, var(--mantle), var(--base));
    border: 1px solid var(--surface0);
    border-left: 4px solid var(--accent);
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    padding: 2rem;
  }

  .abstract-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .abstract-header h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--text);
  }

  .abstract-content p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text);
    text-align: justify;
    hyphens: auto;
  }

  .keywords-container {
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--surface0);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
  }

  .keywords-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--subtext0);
  }

  .keywords-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .keyword-tag {
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
    background: var(--surface0);
    color: var(--accent);
    border-radius: var(--radius-full);
    border: 1px solid var(--surface1);
  }

  /* Contributions */
  .contributions-section {
    margin-bottom: 4rem;
  }

  .contributions-grid {
    display: grid;
    gap: 1.25rem;
  }

  .contribution-card {
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: all 0.3s ease;
    animation: fadeInUp 0.5s ease forwards;
    animation-delay: calc(var(--index) * 0.1s);
    opacity: 0;
  }

  .contribution-card:hover {
    border-color: var(--accent);
    transform: translateX(8px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .contribution-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .contribution-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
  }

  .contribution-line {
    flex: 1;
    height: 2px;
    opacity: 0.3;
    border-radius: 1px;
  }

  .contribution-card h4 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text);
  }

  .contribution-card p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--subtext0);
  }

  /* Results Tables */
  .results-section {
    margin-bottom: 4rem;
  }

  .table-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .tab-btn {
    padding: 0.6rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;
    background: var(--surface0);
    color: var(--subtext0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tab-btn:hover {
    background: var(--surface1);
    color: var(--text);
  }

  .tab-btn.active {
    background: var(--accent);
    color: var(--mantle);
    border-color: var(--accent);
  }

  .table-container {
    background: var(--mantle);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .table-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: var(--surface0);
    border-bottom: 1px solid var(--surface1);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text);
  }

  .table-icon {
    font-size: 1.1rem;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .data-table th {
    padding: 1rem 1.25rem;
    text-align: left;
    font-weight: 600;
    color: var(--subtext0);
    background: rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid var(--surface1);
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
  }

  .data-table td {
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid var(--surface0);
    color: var(--text);
  }

  .data-table tbody tr:last-child td {
    border-bottom: none;
  }

  .data-table tbody tr:hover {
    background: rgba(var(--accent-rgb), 0.05);
  }

  .data-table tbody tr.highlight {
    background: rgba(var(--accent-rgb), 0.1);
  }

  .data-table tbody tr.highlight td {
    color: var(--accent);
    font-weight: 600;
  }

  .data-table tbody tr.highlight td.model-name {
    color: var(--accent);
  }

  .model-name, .feature-name {
    font-weight: 500;
  }

  .numeric {
    font-family: 'JetBrains Mono', monospace;
    text-align: right;
  }

  .center {
    text-align: center;
  }

  .highlight-header {
    background: rgba(var(--accent-rgb), 0.15) !important;
    color: var(--accent) !important;
  }

  .highlight-cell {
    background: rgba(var(--accent-rgb), 0.08);
    font-weight: 600;
    color: var(--accent);
  }

  .table-note {
    margin: 0;
    padding: 0.875rem 1.5rem;
    font-size: 0.8rem;
    color: var(--subtext0);
    font-style: italic;
    border-top: 1px solid var(--surface0);
  }

  /* Tech Stack */
  .tech-section {
    margin-bottom: 4rem;
  }

  .tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .tech-card {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
  }

  .tech-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .tech-icon {
    font-size: 1rem;
  }

  .tech-name {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text);
  }

  .tech-category {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--subtext0);
    background: var(--base);
    padding: 0.2rem 0.4rem;
    border-radius: var(--radius-sm);
  }

  .tech-card[data-category="framework"] { border-left: 3px solid var(--green); }
  .tech-card[data-category="language"] { border-left: 3px solid var(--blue); }
  .tech-card[data-category="library"] { border-left: 3px solid var(--peach); }
  .tech-card[data-category="model"] { border-left: 3px solid var(--mauve); }
  .tech-card[data-category="deployment"] { border-left: 3px solid var(--yellow); }
  .tech-card[data-category="platform"] { border-left: 3px solid var(--teal); }

  /* Paper Preview */
  .paper-preview-section {
    margin-bottom: 4rem;
  }

  .paper-preview {
    background: var(--mantle);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.25rem;
    background: var(--surface0);
    border-bottom: 1px solid var(--surface1);
  }

  .preview-file {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--subtext0);
  }

  .file-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
  }

  .download-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
    color: var(--accent);
    background: var(--base);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }

  .download-btn:hover {
    background: var(--surface1);
    border-color: var(--accent);
  }

  .preview-content {
    max-height: 500px;
    overflow: auto;
  }

  .preview-content pre {
    margin: 0;
    padding: 1.5rem;
  }

  .preview-content code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    line-height: 1.6;
    color: var(--subtext0);
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* CTA */
  .cta-section {
    position: relative;
    padding: 3rem 2rem;
    background: linear-gradient(145deg, var(--surface0), var(--mantle));
    border: 1px solid var(--surface1);
    border-radius: var(--radius-lg);
    text-align: center;
    overflow: hidden;
  }

  .cta-decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .cta-circle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(var(--accent-rgb), 0.1), transparent 70%);
  }

  .cta-circle:nth-child(1) {
    width: 300px;
    height: 300px;
    top: -100px;
    left: -100px;
  }

  .cta-circle:nth-child(2) {
    width: 200px;
    height: 200px;
    bottom: -50px;
    right: -50px;
  }

  .cta-content {
    position: relative;
    z-index: 1;
  }

  .cta-content h3 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
  }

  .cta-content p {
    margin: 0 0 1.5rem;
    color: var(--subtext0);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
  }

  .cta-btn--primary {
    background: var(--accent);
    color: var(--mantle);
  }

  .cta-btn--primary:hover {
    filter: brightness(1.15);
    transform: translateY(-2px);
  }

  .cta-btn--secondary {
    background: var(--surface0);
    color: var(--text);
    border: 1px solid var(--surface1);
  }

  .cta-btn--secondary:hover {
    border-color: var(--accent);
    background: var(--surface1);
  }

  .cta-btn--ghost {
    color: var(--subtext0);
    border: 1px solid var(--surface1);
  }

  .cta-btn--ghost:hover {
    color: var(--accent);
    border-color: var(--accent);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .research-page {
      /* Matches other project pages - no extra padding needed */
    }

    .paper-header {
      padding: 1.5rem 0 2rem;
    }

    .paper-actions {
      flex-direction: column;
    }

    .action-btn {
      width: 100%;
      justify-content: center;
    }

    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .contribution-card:hover {
      transform: translateX(0);
    }

    .table-tabs {
      overflow-x: auto;
      flex-wrap: nowrap;
      padding-bottom: 0.5rem;
    }

    .tab-btn {
      white-space: nowrap;
    }

    .data-table {
      font-size: 0.8rem;
    }

    .data-table th,
    .data-table td {
      padding: 0.6rem 0.75rem;
    }

    .cta-actions {
      flex-direction: column;
    }

    .cta-btn {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .title-main {
      font-size: 2.5rem;
    }

    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .metric-card {
      padding: 1rem 0.75rem;
    }

    .metric-value {
      font-size: 1.4rem;
    }

    .abstract-container {
      padding: 1.5rem;
    }

    .contribution-card {
      padding: 1.25rem;
    }
  }
</style>
