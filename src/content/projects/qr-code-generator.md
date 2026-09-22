---
title: QR Code Generator
shortTitle: QR Code Generator
summary: "A three-person university coursework project that constructs Version 1 and 2 QR codes from the specification, with a Flask interface for custom colours, module shapes, and output sizing."
seoDescription: "A three-person Python coursework project implementing Version 1 and 2 QR encoding, matrix construction, masking, and a customisable Flask interface."
year: "2025"
type: "University group coursework"
role: "Team developer"
featured: true
order: 3
draft: false
accent: "#47a98b"
technologies:
  - Python
  - Flask
  - Pillow
  - reedsolo
  - HTML
  - CSS
cover: ../../assets/projects/project_two.png
coverFit: contain
repoUrl: https://github.com/gabrieldorosh/QR-Code-Generator
phoneScreens: []
---

## Brief

- **Coursework:** This was a three-person project for the Programming in Python module at the University of Reading.
- **Team:** I worked with Joao Sousa and Jonathan Cronin. The project is presented as collaborative work rather than as a solo implementation.
- **Technical ambition:** Instead of wrapping an existing QR-generation package, we implemented the encoding, matrix construction, masking, and format-information stages ourselves.
- **Supported subset:** The implementation covers QR Versions 1 and 2, ISO-8859-1 Byte Mode, and Level-L error correction.

## Team delivery

- **Shared implementation:** The encoder, matrix builder, mask scorer, image renderer, and Flask interface were integrated into one workflow.
- **Attribution:** The repository credits all three authors. Because it does not preserve reliable per-module ownership, I describe the implementation as shared work.

## Implementation

- **Encoding:** Input is encoded in ISO-8859-1 Byte Mode. Versions 1-L and 2-L have 19 and 34 data codewords respectively; after encoding overhead, their input capacities are 17 and 32 bytes.
- **Error correction:** Reed-Solomon error-correction codewords are generated through `reedsolo`.
- **Matrix construction:** Python lists represent the QR matrix while finder, alignment, timing, dark, and format modules are placed around the encoded data.
- **Mask selection:** All eight standard mask patterns are scored, and the lowest-penalty result is selected.
- **Web interface:** Flask handles form submissions and Pillow renders the generated matrix as a PNG.
- **Options:** Users can choose foreground and background colours, square or circular modules, pixel size, and an optional slideshow of the construction stages.

## Testing

- **Demonstration:** The repository records a `Hello World` example and intermediate images for pattern placement, data placement, masking, and format information.
- **Boundary handling:** The interface rejects unsupported characters and inputs over 34 bytes. Its version-selection checks currently confuse data-codeword capacity with input capacity, so boundary-length inputs need correction and regression tests.
- **Evidence limit:** The repository has no automated test suite or recorded cross-device scan matrix, so I only claim the Version 1 and 2 workflow demonstrated there.

## Outcome

- **Result:** The project produced a working Flask demonstration of the QR-construction pipeline within its defined Version 1 and 2, Byte Mode, and Level-L boundaries.
- **Limitations:** It does not support larger versions, other encoding modes, or additional error-correction levels. Inputs of 18–19 bytes need Version 2, and 33–34 bytes exceed the supported Byte Mode capacity; the current interface does not handle these boundaries correctly.
- **Learning:** Building each stage showed how the bitstream, error-correction codewords, mask, and final matrix depend on one another.
- **Next step:** Add automated reference-matrix tests and scanner checks before extending the supported standard.
