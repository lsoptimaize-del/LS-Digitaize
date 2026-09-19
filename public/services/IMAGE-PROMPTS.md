# Service hero images — generation prompts

Every file below already exists as a blue placeholder. Generate the real image, keep the
**exact filename and aspect ratio**, drop it in `public/services/`, and the page picks it up.

## House style — append to every prompt

> Editorial commercial photography, bright natural daylight, airy and clean, off-white
> (#FAFAF7) and cool blue palette — sky blue #4A9EFF, deep blue #2A7DE1, cyan #5BC9E8.
> No orange, red, green or yellow anywhere. No text, no logos, no watermarks. Shallow depth
> of field, soft shadows, modern premium brand-campaign look. Shot on 35mm, f/2.0.

---

## 01 · Branding & Identity

**`brand-book.jpg`** — 1200×900 (4:3)
> Overhead flat-lay of an open brand guidelines book on an off-white desk, showing a logo
> page and a blue colour-swatch strip. Around it: printed business cards, a folded poster,
> a blue paint chip fan. Minimal, lots of negative space, soft daylight from the left.

## 02 · Organic Marketing

**`organic-1.jpg`**, **`organic-2.jpg`**, **`organic-3.jpg`** — 1080×1350 (4:5 portrait)
These become the scrolling content wall behind the headline, so each must read instantly
as a social post, be light overall, and hold a blue accent.
1. > A young creator filming a vertical video on a phone tripod in a bright white studio, blue seamless backdrop, natural window light.
2. > Close-up of hands editing a short-form video on a laptop, cool blue interface glow on a white desk, coffee cup out of focus.
3. > A minimal product still life on a pale blue paper backdrop, single dramatic soft shadow, one bold blue object as the hero.

## 03 · Performance Marketing

**`perf-1.jpg`**, **`perf-2.jpg`** — 1080×1080 (1:1 square)
These float as "ad creative" cards over the chart.
1. > A square social ad creative: a confident model against a bright blue gradient wall, bold negative space top-left for copy, high-key lighting.
2. > A square social ad creative: a sleek product floating on a pale blue background with a soft drop shadow, studio lit, clean and premium.

## 04 · Social Media Management

**`social-1.jpg`** … **`social-4.jpg`** — 1080×1350 (4:5 portrait)
These sit inside phone mockups, so keep the subject centred and away from the edges.
1. > A stylish person laughing on a city street, blue-toned outfit, bright overcast daylight, candid lifestyle feel.
2. > A flat-lay of a café table from above — blue ceramic cup, notebook, phone — on white marble.
3. > A behind-the-scenes shot of a small content shoot: a ring light, a phone on a tripod, soft blue studio backdrop.
4. > A close-up portrait of a model against a sky-blue wall, direct eye contact, crisp daylight, minimal styling.

## 05 · Influencer & Offline Marketing

**`creator-1.jpg`**, **`creator-2.jpg`**, **`creator-3.jpg`** — 800×1000 (4:5 portrait)
Creator cards in the moving rows. Three visibly different people, same lighting and palette.
1. > Portrait of a young female creator holding a phone up as if filming herself, pale blue studio backdrop, soft even light, friendly and confident.
2. > Portrait of a young male creator with headphones around his neck, mid-laugh, light blue background, natural daylight.
3. > Portrait of a creator in a denim jacket leaning against a white wall with a blue shadow falling across it, relaxed posture.

## 06 · Events, Photography & Videography

**`event-wide.jpg`** — 1920×1080 (16:9) — this is the **full-screen hero background** and gets a
dark blue overlay, so shoot it dramatic and let the left half stay simple for the headline.
> A brand launch event from the back of the room: a speaker small on a lit stage, the crowd
> in silhouette, blue stage wash and haze in the beams, wide cinematic framing, dark and moody.

**`event-1.jpg`**, **`event-2.jpg`** — 600×400 (3:2) — small corner thumbnails.
1. > A photographer shooting an event from the crowd, camera raised, blue stage light behind.
2. > Guests talking at a modern event space, blue uplighting on white walls, candid moment.

## 07 · 1:1 Consultation & Business Development

**`session.jpg`** — 1200×900 (4:3) — shown as a pinned polaroid, so the subject must be centred.
> Two people in a bright meeting room working through a strategy on a whiteboard covered in
> blue marker diagrams and sticky notes, mid-conversation, natural window light, candid.

---

## Notes

- If a generated image comes out warm, ask for "cool blue colour grade, no warm tones".
- Anything with people works best at these crops if the subject is centred — the page crops
  to fill, and phone mockups are a tall 9:17 window.
- Filenames are referenced in `app/components/service/ServiceHeroes.tsx`.
