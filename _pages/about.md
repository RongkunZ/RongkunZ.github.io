---
layout: single
title: ""
permalink: /
author_profile: false
classes: portfolio-page home-page
---

<section class="cinema-hero" data-cinema-hero>
  <div class="cinema-hero__copy">
    <p class="eyebrow">RONGKUN ZHOU / RESEARCHER & ENGINEER</p>
    <h1><span>Building AI systems</span><span>that reason with</span><em>evidence.</em></h1>
    <p class="cinema-hero__discipline">Language reasoning · Retrieval · Reliable machine learning</p>
    <p class="cinema-hero__intro">I turn model failures into precise research questions, then build benchmarks and systems that make the answers measurable.</p>
    <div class="cinema-hero__links">
      <a href="#featured-research">Selected research <span>↘</span></a>
      <a href="/files/CV_RongkunZhou.pdf">Curriculum vitae <span>↓</span></a>
    </div>
  </div>
  <figure class="cinema-hero__portrait">
    <img class="cinema-hero__image" src="/images/personal/IMG_3575.JPG" alt="Rongkun Zhou in a mountain landscape" fetchpriority="high">
    <figcaption><strong>Rongkun Zhou</strong><span>M.S. Computer Science · Johns Hopkins</span></figcaption>
  </figure>
  <a class="cinema-hero__scroll" href="#featured-research"><span>Scroll</span></a>
</section>

<section class="research-stage" id="featured-research" data-research-stage>
  <div class="research-stage__inner">
    <header class="research-title reveal">
      <div><p class="research-index">01 / Featured research</p><p class="eyebrow">ACCEPTED AT COLM 2026</p></div>
      <div><h2>SciTaRC</h2><p>Scientific Tabular Reasoning and Claims</p></div>
    </header>

    <div class="research-overview reveal" id="research-overview">
      <div><p class="research-index">The question</p><h3>Can a model reason over scientific evidence—not just describe it?</h3></div>
      <div><p>SciTaRC is an expert-authored benchmark for questions that require language understanding and complex computation over scientific tables.</p><p>Instead of treating reasoning as one opaque score, the study separates three stages. That makes it possible to see whether a system misunderstood the evidence, chose the wrong strategy, or failed while carrying out a sound plan.</p></div>
    </div>

    <div class="reasoning-sequence" aria-label="SciTaRC reasoning stages">
      <article class="reasoning-step reveal"><span>01</span><h3>Understand</h3><p>Read the table, units, labels, and relationships in context.</p></article>
      <article class="reasoning-step reveal"><span>02</span><h3>Plan</h3><p>Translate the question into a sequence of valid operations.</p></article>
      <article class="reasoning-step reveal"><span>03</span><h3>Execute</h3><p>Carry out the plan faithfully and return a supported answer.</p></article>
    </div>

    <div class="research-result reveal">
      <p class="research-index">What the benchmark reveals</p>
      <p>Even leading reasoning models often form the right strategy, then fail during execution. The bottleneck is not always knowing <em>what</em> to do—it is doing it correctly.</p>
    </div>

    <div class="research-links reveal"><a href="https://arxiv.org/abs/2603.08910">Read the paper ↗</a><a href="https://github.com/JHU-CLSP/SciTaRC">View the code ↗</a><a href="https://huggingface.co/datasets/JHU-CLSP/SciTaRC">Explore the dataset ↗</a></div>
  </div>
</section>

<section class="home-afterword">
  <div class="signal-bar reveal" aria-label="Profile highlights">
    <div><span>Latest paper</span><strong>SciTaRC · COLM 2026</strong></div>
    <div><span>Research focus</span><strong>Evidence-grounded reasoning</strong></div>
    <div><span>Experience</span><strong>Research × Industry</strong></div>
    <div><span>Background</span><strong>CS · Math · Statistics</strong></div>
  </div>

  <section class="section-heading reveal"><div><p class="eyebrow">WHAT I WORK ON</p><h2>One question, seen from three sides.</h2></div><p>How can intelligent systems make claims that are grounded, inspectable, and dependable in practice?</p></section>
  <div class="focus-grid">
    <article class="focus-card reveal"><span>01</span><h3>Structured reasoning</h3><p>Understanding how models plan and execute multi-step operations over tables, text, and interactive environments.</p></article>
    <article class="focus-card reveal"><span>02</span><h3>Evidence & retrieval</h3><p>Connecting generated claims to supporting sources so answers are grounded, inspectable, and easier to trust.</p></article>
    <article class="focus-card reveal"><span>03</span><h3>Applied intelligence</h3><p>Translating models into measurable systems across recommendation, logistics, forecasting, and computer vision.</p></article>
  </div>

  <section class="education-band reveal">
    <div><p class="eyebrow">EDUCATION</p><h2>A quantitative foundation for intelligent systems.</h2></div>
    <div class="education-list"><div><span>2024–2025</span><strong>Johns Hopkins University</strong><p>M.S. in Computer Science</p></div><div><span>2020–2023</span><strong>University of Minnesota – Twin Cities</strong><p>B.S. in Mathematics · Minors in Computer Science and Statistics</p></div></div>
  </section>

  <section class="next-page reveal"><p>Continue exploring</p><a href="/research-project/">Research & Projects <span>→</span></a></section>
</section>
