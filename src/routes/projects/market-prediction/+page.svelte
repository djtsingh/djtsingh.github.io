<script>
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
  title="S&P 500 Market Prediction & Analysis | Projects | Daljeet Singh Lotey"
  description="Tactical S&P 500 forecasting and analysis using feature engineering, ensemble models, and careful backtesting."
  image="/projects/market-prediction.webp"
  canonical="https://djtsingh.github.io/projects/market-prediction"
  type="article"
/>

<article class="project-page">
  <nav class="breadcrumb">
    <a href="/projects" class="back-link">← Projects</a>
  </nav>

  <header class="hero">
    <div class="status-bar">
      <span class="status status--active">Featured</span>
      <span class="year">2023 - 2025</span>
    </div>

    <div class="hero-content">
      <h1>S&P 500 Market Prediction & Analysis</h1>
      <p class="tagline">Tactical forecasting and defensible evaluation for S&P 500 returns</p>
      <p class="description">
        A project inspired by the Hull Tactical Market Prediction competition on Kaggle. It focuses on rigorous feature engineering, time-series-aware validation, and ensemble models to produce robust short-term signals for the S&P 500.
      </p>

      <div class="action-bar">
        <a href="https://www.kaggle.com/competitions/hull-tactical-market-prediction/overview" target="_blank" rel="noopener noreferrer" class="btn btn--primary">Kaggle Competition</a>
        <a href="https://github.com/djtsingh/Market-Prediction-2025" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">Source Code</a>
      </div>
    </div>
  </header>

  <section class="section">
    <h2 class="section-title">Overview</h2>
    <div class="content-grid">
      <div class="content-block">
        <h3>Objective</h3>
        <p>
          Build predictive models and tactical signals for the S&P 500 that generalize across market regimes. Emphasis is placed on reproducible feature engineering, walk-forward validation, and risk-aware evaluation.
        </p>
      </div>

      <div class="content-block">
        <h3>Data</h3>
        <p>
          Uses historical S&P 500 prices, derived technical indicators, macro features, and engineered statistics aligned to competition structure. Time-based features and careful alignment of targets prevent lookahead bias.
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Approach</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🔬</div>
        <h3>Feature Engineering</h3>
        <p>Rolling returns, volatility, momentum, ratio features, day-of-week encodings, and cross-asset signals where available. Features are normalized per-window to reduce regime sensitivity.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🧪</div>
        <h3>Validation</h3>
        <p>Walk-forward time-series split with out-of-time test sets. Backtests use transaction cost assumptions and position sizing rules to estimate realistic P&L.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🤖</div>
        <h3>Modeling</h3>
        <p>Gradient-boosted trees (LightGBM/XGBoost), stacked ensembles, and simple neural baselines where appropriate. Hyperparameter tuning via time-aware search.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📈</div>
        <h3>Evaluation</h3>
        <p>Sharpe-like metrics, cumulative returns plots, precision/recall on directional predictions, and competition-specific scoring (as applicable).</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Technical Highlights</h2>
    <div class="highlights">
      <div class="highlight-item">
        <h3>🎯 Robust Features</h3>
        <p>Designed features to be robust across lookback windows and market regimes; use of winsorization and rolling normalization helped stabilize model inputs.</p>
      </div>

      <div class="highlight-item">
        <h3>🧩 Ensemble Strategy</h3>
        <p>Blended multiple model families with time-aware cross-validation to reduce overfitting and improve generalization.</p>
      </div>

      <div class="highlight-item">
        <h3>🔁 Reproducible Pipelines</h3>
        <p>Data pipelines implemented with explicit seeds, incremental caching, and clear separation between feature generation, training, and backtest stages.</p>
      </div>

      <div class="highlight-item">
        <h3>🔒 Risk Controls</h3>
        <p>Position sizing, max-drawdown limits, and transaction cost modeling included in evaluation to produce realistic performance estimates.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Results & Metrics</h2>
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-value">α</div>
        <div class="metric-label">Tactical Alpha</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">Sharpe</div>
        <div class="metric-label">Risk-adjusted</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">Backtest</div>
        <div class="metric-label">Walk-forward P&L</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">Robust</div>
        <div class="metric-label">Cross-validation</div>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Kaggle Submission</h2>
    <div class="submission-card">
      <div class="submission-meta">
        <h3>Competition</h3>
        <p>Hull Tactical Market Prediction — Kaggle competition format and leaderboard.</p>
        <a href="https://www.kaggle.com/competitions/hull-tactical-market-prediction/overview" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">View Competition</a>
      </div>
      <div class="submission-preview">
        <img src="/projects/market-prediction.webp" alt="Market prediction cover" />
        <div class="submission-actions">
          <a href="https://github.com/djtsingh/Market-Prediction-2025" target="_blank" rel="noopener noreferrer" class="btn btn--primary">View Repo</a>
          <a href="https://www.kaggle.com/competitions/hull-tactical-market-prediction/overview" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">Kaggle Entry</a>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2>Explore the Code & Replicate</h2>
    <p>All data processing and model code is available in the repository. Reproducible scripts and notebooks are included to reproduce experiments and backtests.</p>
    <div class="cta-actions">
      <a href="https://github.com/djtsingh/Market-Prediction-2025" target="_blank" rel="noopener noreferrer" class="btn btn--primary">Open Source Repo</a>
    </div>
  </section>
</article>

<style>
  .project-page { max-width: 900px; margin: 0 auto; padding: 2rem 0; }
  .breadcrumb { margin-bottom: 1.5rem; }
  .back-link { color: var(--subtext1); font-size: 0.9rem; }
  .hero { margin-bottom: 3rem; }
  .status-bar { display:flex; gap:1rem; margin-bottom:1rem; }
  .status--active { background: rgba(166,227,161,0.2); color:var(--green); padding:0.25rem 0.6rem; border-radius:6px; font-weight:600; }
  .hero-content h1 { margin:0 0 0.5rem; font-size:clamp(1.8rem,4vw,2.6rem); }
  .tagline { color:var(--accent); margin:0 0 0.75rem; }
  .description { color:var(--subtext1); margin:0 0 1.25rem; }
  .action-bar { display:flex; gap:0.75rem; }

  .section { margin-bottom:3rem; }
  .section-title { font-size:1.25rem; margin-bottom:1rem; }
  .content-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.25rem; }
  .features-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem; }
  .feature-card { padding:1rem; background:var(--surface0); border-radius:8px; }
  .feature-icon { font-size:1.5rem; margin-bottom:0.5rem; }

  .highlights { display:flex; flex-direction:column; gap:1rem; }
  .highlight-item { padding:1rem; background:var(--base); border-radius:8px; }

  .metrics-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:1rem; }
  .metric-card { padding:1rem; text-align:center; background:var(--surface0); border-radius:8px; }
  .metric-value { font-weight:700; color:var(--accent); font-size:1.2rem; }
  .metric-label { font-size:0.75rem; color:var(--subtext0); }

  .submission-card { display:grid; grid-template-columns: 1fr 320px; gap:1rem; align-items:center; }
  .submission-meta { padding:1rem; }
  .submission-preview img { width:100%; border-radius:8px; border:1px solid var(--surface1); }
  .submission-actions { display:flex; gap:0.5rem; margin-top:0.75rem; }

  .cta-section { text-align:center; padding:2rem; background:var(--base); border-radius:10px; }

  @media (max-width:768px){
    .submission-card { grid-template-columns: 1fr; }
    .submission-preview { order:-1; }
  }
</style>