# Raquel Tribute Site — PRD

## Problema original
Site de portfólio/homenagem para a Raquel (namorada do Lucas). Inspiração visual: Lando Norris + Apple. Foco em animações scroll-driven cinematográficas, tipografia marcante, layouts assimétricos e visual premium. Requisitado inicialmente em Vue 3 + Tailwind + GSAP/ScrollTrigger; convertido para React + Tailwind + GSAP + Lenis por limitação de stack Emergent (equivalência funcional 1:1).

## Persona
- **Autor**: Lucas (namorado). Contato dela salvou como "Lucas?" durante a pandemia; o "?" virou "!".
- **Homenageada**: Raquel — professora/pedagoga, leciona História para 4º ano do fundamental. Fã incondicional do Justin Bieber. Gosta de laranja. Ele curte roxo.

## Stack
- Frontend: React 19 + Tailwind + GSAP 3 + ScrollTrigger + Lenis 1
- Backend: FastAPI (template padrão, não usado)
- Sem 3rd-party integrations
- Fonts: Fraunces (display italic), Manrope (body), Caveat (hand), JetBrains Mono (accent)
- Palette: `--night #0a0510`, `--plum-900/950`, `--violet-500/600`, `--tangerine #fb923c`, `--amber #fbbf24`, `--ivory #fdf7ee`

## Arquitetura
```
/app/frontend/src/
├── App.js              # Root: monta hooks + seções
├── hooks/
│   ├── useLenis.js     # smooth scroll + GSAP ticker sync
│   └── useCursor.js    # cursor dot custom
├── components/
│   ├── Nav.jsx         # fixed nav + progress bar
│   ├── Hero.jsx        # Ato 01 cinematográfico
│   ├── Journey.jsx     # Ato 02 timeline
│   ├── Music.jsx       # Ato 03 Bieber
│   ├── OurStory.jsx    # Ato 04 Lucas?→Lucas!
│   └── Footer.jsx
├── constants/
│   ├── testIds.js      # todos data-testids
│   └── assets.js       # IMAGES + BIEBER_GALLERY + STORY_GALLERY (placeholders)
└── index.css / App.css # palette, fonts, animations
```

## What's implemented (2026-01)
- ✅ Hero cinematográfico: clip-path reveal + parallax + scroll-scrub separating title
- ✅ Mini Raquel polaroid + reveal de texto
- ✅ Journey timeline com 3 steps animados (Pedagogia / 4º ano / História)
- ✅ Music section com marquee parallax + galeria placeholder (6 slots)
- ✅ Our Story com 3 chapters + reveal "?" → "!" morph + carta de amor + galeria placeholder (4 slots)
- ✅ Smooth scroll Lenis + progress bar + custom cursor
- ✅ Responsivo desktop/mobile
- ✅ Todas as data-testids
- ✅ Testing agent: 100% frontend passed

## Backlog / Next (priorizado)
- **P1**: Substituir placeholders da galeria Bieber (6 slots) e Our Story (4 slots) por fotos reais — basta alimentar `src` em `/app/frontend/src/constants/assets.js`.
- **P2**: Adicionar seção de "Cartas" (mensagens de amigos/família da Raquel).
- **P2**: Modo trilha sonora — player embutido com playlists do Justin.
- **P3**: Compartilhamento social — Open Graph com foto + botão "compartilhar com ela".
- **P3**: Easter egg — sequência de teclas mostra mensagem escondida.
