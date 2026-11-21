# GV-BMTL-project
This is the official repository for the BMTL project. It contains all the files and scripts.

#WORKING
# GV-BMTL Page Flattener

Drag four dots onto the corners of a tilted page photo, and watch it flatten live, just like a scanner app. The point is to show that a scanner doesn't just crop the photo. It **stretches** it with maths.

**Live link:** https://mocacad.github.io/GV-BMTL-project/

## How the engine works

The engine is in `engine.js`. It works in three steps.

### Step 1: turn the 4 dots into 8 clues (`numbers_looker`)

Each corner of the page has a position on the flat new image and a position in the original photo. Every corner gives two clues: one for the x coordinate (left and right) and one for the y coordinate (up and down). Four corners give 8 clues.

### Step 2: solve the clues with Gaussian elimination (`solve_numbers`)

The 8 clues are 8 equations with 8 unknowns, the same kind of simultaneous equations we solve in school, just bigger. The engine solves them in two parts:

1. **Clear each column below the diagonal.** For each column, find the row with the biggest number, swap it to the top, then clear that column in every row below. If even the biggest number is basically zero, the dots are unusable, so the engine stops instead of crashing.
2. **Back substitution.** Solve the last equation first, then work upwards, using each answer to solve the equation above it.

The result is 8 numbers: the "map" between the flat page and the photo.

### Step 3: find where each pixel came from (`position_of_pixel`)

Give it the 8 numbers and any point on the flat page, and it tells you where that point is in the photo. It first works out **w**, the shrink factor that creates perspective (parts of the page further from the camera look smaller), then uses it to find x and y.

To build the flat page, every pixel asks the map where it came from in the photo and copies that colour. The flat page is made entirely from the photo's own pixels, just rearranged by maths.

## Files

| File | What it is |
|---|---|
| `engine.js` | The maths engine (Steps 1 to 3) |
| `test.html` | Test page that checks the engine gives the right answers |
| `index.html` | The main webpage |

## Testing

Open `test.html`. It runs four checks:

| Test | Expected |
|---|---|
| School example (2x + y = 5, 4x + 3y = 11) | x = 2, y = 1 |
| Page at double size, 8 numbers | [2, 0, 0, 0, 2, 0, 0, 0] |
| Pixel (100, 100) | lands at (200, 200) |
| Pixel (50, 50) | lands at (100, 100) |

All four pass.

## Team

| Member | Built |
|---|---|
| Syed Ibraheem | Maths engine: the 8 clues, Gaussian elimination solver, pixel mapping, tests |
| Talha | Webpage interface: canvases, draggable dots, layout |

## Use of AI

AI tools are allowed under the challenge rules. I used Claude (AI) as a tutor to learn homography and Gaussian elimination, and to help find bugs. I typed and tested the engine myself, and I can explain every line. No AI runs inside the project: all results are computed live by our own code.
