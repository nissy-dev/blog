---
name: "new-post"
root: "."
output: "contents"
questions:
  name: "Please enter a directory name."
  title: "Please enter a blog title."
  tag:
    message: "Please enter a tag name."
    choices: ["blog", "note"]
---

# {{ inputs.name }}/index.md

```markdown
---
title: "{{ inputs.title }}"
date: "{{ 'new Date().toISOString()' | eval }}"
description: "description"
tags: ["{{ inputs.tag }}"]
---
```
