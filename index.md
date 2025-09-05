---
title: My Portfolio
layout: main
---
# Welcome to My Portfolio

Hi, I'm Daljeet Singh, a DevOps engineer. Explore my projects below!

{% for project in collections.projects %}
  <article>
    <h2>{{ project.data.title }}</h2>
    <p>{{ project.data.description }}</p>
    <a href="{{ project.data.link }}">View Project</a>
  </article>
{% endfor %}