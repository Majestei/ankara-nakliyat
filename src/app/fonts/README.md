# Inter Turkish/Latin subset

Source: https://github.com/google/fonts/blob/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf
Source font version: `4.001;git-66647c0bb`, identical to the prior next/font/google assets.
License: SIL Open Font License 1.1; included in `OFL-Inter.txt`.

`inter-tr-latin.woff2` retains the complete weight axis (100–900), fixes the optical-size axis at the original default 14, and includes Latin-1, Turkish letters, common typographic punctuation, euro/lira signs, arrows and trademark. Standard OpenType shaping features are retained. Uncommon scripts continue to use the system fallback.

Created with fontTools 4.65.0 and Brotli 1.2.0. FontTools `instantiateVariableFont(font, {'opsz': 14})` was saved/reopened, then subset using default `subset.Options()` and these code points:

- U+0020–00FF
- U+0130, 0131, 015E, 015F, 011E, 011F, 0152, 0153, 0178, 0192, 02C6, 02DC
- U+2000–206F
- U+20AC, 20BA, 2122, 2212, 2191, 2193

The resulting WOFF2 is 43,156 bytes, replacing two preloaded Inter subsets totaling approximately 134 KB. At weights 100, 400, 500, 600, 700 and 900, outline drawing commands and advance widths for retained characters were compared with the previous production fonts: no differences. Layout retains the existing Arial fallback ascent, descent, line-gap and size-adjust metrics.
