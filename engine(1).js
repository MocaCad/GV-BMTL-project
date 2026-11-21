// Finding the 8 numbers using Gaussian elimination
// Author: (Syed ibraheem )

// Step 1: turn the 4 dots into 8 clues
function numbers_looker(flat, dots) {
     let A = []; // the numbers in front of each unknown are stored here
     let B = []; // the answers for each clue are here
     for (let R = 0; R < 4; R++) { // go through the 4 corners
          let [q, v] = flat[R]; // corner on the flat new image
          let [x, y] = dots[R]; // the same corner in the original image

          // 1st clue: the x coordinate (left and right)
          A.push([q, v, 1, 0, 0, 0, -q * x, -v * x]);
          B.push(x);
          // 2nd clue: the y coordinate (up and down)
          A.push([0, 0, 0, q, v, 1, -q * y, -v * y]);
          B.push(y);
     }
     return [A, B]; // gives back the 8 clues
}

// Step 2: solve the clues with Gaussian elimination
function solve_numbers(A, B) {
     let n = B.length; // how many numbers we need to solve

     // PART 1: clear each column below the diagonal
     for (let column = 0; column < n; column++) {
          // find the row with the biggest number in this column
          let biggest = column;
          for (let row = column + 1; row < n; row++) {
               if (Math.abs(A[row][column]) > Math.abs(A[biggest][column])) {
                    biggest = row;
               }
          }

          // if even the biggest is basically zero, the dots are unusable
          if (Math.abs(A[biggest][column]) < 1e-10) { // 1e-10 = basically zero
               return null;
          }

          // swap that row to the top (two rows swapped in one line)
          [A[column], A[biggest]] = [A[biggest], A[column]];
          [B[column], B[biggest]] = [B[biggest], B[column]];

          // clear this column in every row below
          for (let row = column + 1; row < n; row++) {
               let factor = A[row][column] / A[column][column];
               for (let k = column; k < n; k++) {
                    A[row][k] = A[row][k] - factor * A[column][k];
               }
               B[row] = B[row] - factor * B[column];
          }
     }

     // PART 2: back substitution, solving from the last equation up
     let answers = new Array(n).fill(0);
     for (let row = n - 1; row >= 0; row--) {
          let total = B[row];
          for (let k = row + 1; k < n; k++) {
               total = total - A[row][k] * answers[k];
          }
          answers[row] = total / A[row][row];
     }

     return answers;
}

// Step 3: use the 8 numbers to find where a flat-page pixel is in the photo
function position_of_pixel(h, q, v) {
     // h = the 8 numbers, (q, v) = a point on the flat page
     let w = h[6] * q + h[7] * v + 1; // the shrink factor
     let x = (h[0] * q + h[1] * v + h[2]) / w;
     let y = (h[3] * q + h[4] * v + h[5]) / w;
     return [x, y];
}
