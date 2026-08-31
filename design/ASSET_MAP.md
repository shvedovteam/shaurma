# Food asset map

Generated presentation imagery for the approved Figma concept. These images are intended for the prototype and pitch. Before production launch, replace them with real photography of the restaurant's food while keeping the same filenames and crop roles where practical.

## Source of truth

Figma: https://www.figma.com/design/X2Os31gFTJ8oVP3iToHT8b

## Asset mapping

| File | UI role | Desktop Figma node | Mobile Figma node |
| --- | --- | --- | --- |
| `design/assets/hero-shawarma.webp` | Hero / flagship shawarma | `1:12` | `1:85` |
| `design/assets/shawarma-chicken.webp` | Menu — Шаурма с курицей | `1:30` | `1:99` |
| `design/assets/shawarma-beef.webp` | Menu — Шаурма с говядиной | `1:39` | `1:108` |
| `design/assets/shawarma-spicy.webp` | Menu — Шаурма острая | `1:48` | Add as the third mobile product card when implementing the expanded menu |
| `design/assets/bread-lavash-matnakash.webp` | Bakery story — lavash / matnakash | `1:57` | `1:117` |

## Implementation rules

- Keep these exact filenames when the frontend is created so the Figma-to-code mapping remains obvious.
- Use `object-fit: cover` for the photo containers.
- Adjust `object-position` per breakpoint only when needed to keep the cut face of the shawarma or the bread texture visible.
- The hero image should remain the strongest and largest food visual on the page.
- Menu images must use consistent crop ratios and visual treatment.
- Do not mix these images with unrelated stock photography styles.
- When real restaurant photos are supplied, replace the files in-place rather than changing component contracts.

## Planned frontend location

During implementation, copy or move these assets to a runtime-safe location such as `public/images/` while retaining their filenames. The files in `design/assets/` remain the design handoff originals.
