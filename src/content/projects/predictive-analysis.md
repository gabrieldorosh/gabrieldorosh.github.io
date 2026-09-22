---
title: Counter-Strike Player Performance Prediction
shortTitle: CS2 Predictive Analytics
summary: "For my final-year dissertation, I built a leakage-aware machine-learning pipeline to test whether historical HLTV statistics could predict a professional player's performance on an upcoming map. The selected ensemble reached 0.630 ROC-AUC on a chronological test period, indicating limited above-baseline ranking signal."
seoDescription: "A leakage-aware machine-learning study using 63,010 professional Counter-Strike player-map records, reaching 0.630 ROC-AUC on a chronological test period."
year: "2025–2026"
type: "Final-year dissertation"
role: "Sole researcher and developer"
featured: true
order: 1
draft: false
accent: "#d97745"
technologies:
  - Python
  - pandas
  - NumPy
  - scikit-learn
cover: ../../assets/projects/counter-strike-2-hd.jpg
homeCover: ../../assets/projects/counter-strike-2-hd.jpg
coverFit: cover
documentUrl: /projects/predictive-analysis/report/
documentLabel: View degree report
phoneScreens: []
---

## Context

- **Research question:** Could historical statistics predict whether a professional Counter-Strike player would perform well on an upcoming map?
- **Unit of analysis:** Each row represents one player on one map. This created a focused prediction target, preserved map-specific context, and allowed the models to learn across players rather than relying on one player's limited history.
- **Target:** The binary target, `good_match`, was defined as an HLTV player rating greater than 1.0.
- **Why HLTV:** HLTV provides a large public record of professional match statistics without requiring computationally expensive demo parsing. The trade-off is that summary statistics omit richer information about roles, economy, utility, and tactics.

## Dataset and preprocessing

- **Scope:** The dataset contains 63,010 player-map rows from 1,795 professional players, covering 14 January 2016 to 1 March 2026. The positive-class rate is 52.8%.
- **Collection:** Public HLTV player-map pages were collected and parsed into a raw dataset. Pages were cached locally, and request delays with exponential back-off reduced repeat traffic to the source.
- **Cleaning:** Rows missing player, date, or rating were removed; duplicate player-map rows were identified using player, match, and map identifiers. Numeric values were median-imputed within the preprocessing pipeline, while missing categorical values were assigned `Unknown`.
- **Leakage controls:** Rows were ordered chronologically and historical calculations used `shift(1)` so that the current map's outcome could not enter its own features.
- **Temporal split:** The final data comprised 37,169 training rows, 10,901 validation rows, and 14,940 test rows. Date boundaries kept all player rows from an individual map within one split. The test period begins on 7 August 2024, after the release of Counter-Strike 2.

## Features and models

- **Historical signal:** Features covered recent and career form, workload, team and opponent history, map familiarity, and time since the player's previous map.
- **Availability tiers:** The core pre-map tier uses only information available before the map is selected. The map-known tier adds map identity and map-specific history, while the starting-side-known tier adds the player's starting side.
- **Classification:** Candidates included a dummy majority baseline, logistic regression, Random Forest, Extra Trees, and Gradient Boosting classifiers.
- **Regression:** A secondary experiment compared Ridge and tree-based regressors when predicting the continuous player rating rather than the binary target.
- **Final ensemble:** Selected categorical experiments used smoothed target encoding. The final soft-vote classifier averaged probabilities from the validation-selected Random Forest and Extra Trees models.

## Evaluation and key result

- **Selection:** Candidate models were selected using validation ROC-AUC before evaluation on the later chronological test period.
- **Headline result:** The selected ensemble achieved 0.651 validation ROC-AUC and 0.630 test ROC-AUC.
- **Threshold metrics:** At a threshold of 0.50, the ensemble achieved 0.592 balanced accuracy and an F1 score of 0.636 on the test period.
- **Interpretation:** The result indicates limited above-baseline ranking signal. It is not 63% accuracy and is not strong enough for dependable individual player-map forecasts.
- **Regression result:** The selected regressor achieved test MAE 0.272, RMSE 0.351, and R² 0.083, leaving most variation in player rating unexplained.
- **Evaluation caveat:** The test period had already been viewed during baseline development, so its result should be treated as indicative rather than fully independent evidence.

## Limitations

- **Missing context:** Public summary statistics omit player roles, economy, utility usage, tactics, preparation, roster changes, and psychological factors.
- **Era effects:** The dataset spans both CS:GO and CS2, as well as changes to the HLTV rating definition. Temporal indicators cannot capture every change between eras.
- **Data quality:** Some records had missing map metadata or anomalous player groupings, which required explicit checks during cleaning.
- **Validation design:** The project used one temporal split, non-cross-fitted training encodings, and correlated player rows within maps. It did not calculate grouped confidence intervals.
- **Shared threshold:** A rating above 1.0 does not necessarily represent an equally strong performance for every role or player.

## Reflection

- **Engineering practice:** Moving reusable work from notebooks into scripts and package modules made the pipeline easier to rerun, inspect, and reproduce.
- **Research judgement:** Leakage control, chronological evaluation, and an honest interpretation mattered more than chasing a larger headline score.
- **Next iteration:** Richer role or demo-derived data, rolling temporal validation, era-aware features, cross-fitted encoding, and grouped uncertainty estimates would provide a stronger test.
