# AIFS — IEEE Research Requirements

## 1. Research Novelty

The research contribution should go beyond applying conventional ML/DL algorithms to real-estate datasets.

Based on the selected literature, existing research has separately investigated areas such as:

- Housing price prediction using machine learning and deep learning
- Real-estate transaction analysis
- Housing recommendation
- Explainable and fair AI
- SHAP-based automated valuation
- Spatial machine learning
- Open-data-based real-estate prediction
- Fake real-estate listing detection
- Fake-listing classification and clustering

The proposed AIFS framework should therefore focus on the integration of multiple real-estate intelligence capabilities rather than claiming novelty from the use of an individual algorithm.

The research contribution should investigate an integrated framework combining:

- Real-estate property price prediction
- Fake property-listing detection
- Image-based property/listing authenticity analysis
- Explainable predictions
- Multi-city real-estate analysis
- Geographic generalization

The novelty should specifically be established by demonstrating how the integrated framework addresses limitations that are not jointly addressed by the selected existing studies.

The final contribution should be supported through comparative experiments, cross-city validation, explainability analysis, and rigorous evaluation rather than simply claiming that existing algorithms are being applied to a new dataset.

---

## 2. Model Implementation

The project should establish appropriate baseline and advanced models for the different prediction and classification tasks.

For property-price prediction, the experimental comparison should include:

- Linear Regression as a traditional baseline
- Random Forest Regressor as a tree-based ensemble baseline
- XGBoost Regressor as an advanced boosting approach
- A justified deep-learning regression approach where appropriate

The existing XGBoost price-prediction experiment should be retained as part of this comparison. The experiment uses feature engineering, a training/validation/testing split, documented hyperparameters, feature importance, and a saved trained model.

For fake property-listing detection, the experimental comparison should include:

- Random Forest
- Tuned Random Forest
- XGBoost

The existing experiments should be retained, including hyperparameter tuning, classification metrics, feature importance, and saved model/results.

For image-based property/listing analysis, the project should include the trained deep-learning approaches already developed using the selected image datasets. The experiments should document:

- Image dataset source
- Number of images
- Number of classes
- Class distribution
- Training/validation/testing split
- Image preprocessing
- Image resizing
- Normalization
- Data augmentation where applicable
- Model architecture
- Transfer-learning configuration where applicable
- Loss function
- Optimizer
- Learning rate
- Batch size
- Number of epochs
- Training environment
- Model checkpoints
- Evaluation procedure

The image-based experiments should be evaluated using the same experimental methodology wherever the models and datasets are directly comparable.

---

## 3. Evaluation Metrics

### Property-Price Prediction

Regression models should be evaluated using:

- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- R² Score
- Mean Absolute Percentage Error (MAPE), where appropriate

A consolidated comparison should be provided:

| Model | MAE | RMSE | R² | MAPE |
|---|---:|---:|---:|---:|
| Linear Regression | | | | |
| Random Forest | | | | |
| XGBoost | | | | |
| Deep Learning | | | | |

The existing XGBoost experiment should contribute its measured MAE, RMSE, and R² values to this comparison.

### Fake-Listing Detection

Classification models should be evaluated using:

- Accuracy
- Precision
- Recall
- F1 Score
- Confusion Matrix

The existing experimental comparison should include the measured results for Random Forest, Tuned Random Forest, and XGBoost.

### Image-Based Analysis

The image-based deep-learning experiments should report:

- Accuracy
- Precision
- Recall
- F1 Score
- Loss
- Confusion Matrix

Training experiments should additionally record:

- Best epoch
- Final epoch
- Training loss
- Validation loss
- Training/wall time

### Consolidated Results

The final research should contain separate comparison tables for:

1. Property-price prediction
2. Fake-listing detection
3. Image-based classification

The results should also be supported by appropriate plots such as:

- Prediction-versus-ground-truth plots
- Residual/error plots
- Confusion matrices
- Training/validation curves
- Model-comparison plots
- Feature-importance plots
- Image-model evaluation plots

---

## 4. Data Validity

The datasets used for different real-estate tasks must be clearly separated and documented.

### Property Price Data

Property-sale-price prediction and rental-price prediction must be treated as separate prediction problems.

The research should clearly identify:

- Dataset source
- Target variable
- Number of records
- Features
- Whether the target represents sale price or rental price
- Geographic coverage
- Data collection/source characteristics

Rental prices must not be combined with property-sale prices as a single target unless a scientifically justified methodology is established.

### Preprocessing

Document:

- Missing-value handling
- Duplicate removal
- Outlier handling
- Categorical encoding
- Numerical feature processing
- Feature engineering
- Feature selection
- Scaling/normalization where required
- Target preparation

The same preprocessing procedure should not unintentionally use information from the test set.

### Duplicate Properties and Listings

Check for:

- Duplicate properties
- Repeated listings
- Near-identical listings
- Duplicate property records across different datasets
- Duplicate or near-duplicate images in image datasets

The same property or substantially identical listing should not appear in both training and testing data.

### City-Related Leakage

Because the project uses multiple cities, the datasets should be examined for geographic leakage.

The research should verify that:

- City information is correctly represented.
- Properties from the same source/property are not unintentionally split between training and testing.
- Geographic identifiers do not create artificial performance.
- Test-city information is not indirectly incorporated into training.
- Feature engineering does not expose target information.

### Image Dataset Validity

For the image datasets, additionally verify:

- Image-label correctness
- Corrupted images
- Duplicate images
- Near-duplicate images
- Images from the same property/source appearing in different splits
- Class imbalance
- Data leakage caused by preprocessing or augmentation

---

## 5. Generalization

A major research requirement is to determine whether the real-estate models generalize beyond the geographical locations used during training.

The project covers multiple cities, including:

- Ahmedabad
- Bangalore
- Chennai
- Delhi
- Hyderabad
- Kolkata
- Mumbai
- Pune

A conventional random train/test split does not adequately demonstrate geographic generalization.

### City-Wise Holdout

A Leave-One-City-Out evaluation should be performed.

For example:

```text
Training:
Ahmedabad
Bangalore
Chennai
Delhi
Hyderabad
Kolkata
Mumbai

Testing:
Pune
```

The process should then be repeated with different cities as the held-out test location.

For each held-out city, report:

- MAE
- RMSE
- R²
- Prediction-error distribution

The results should compare:

```text
Random train/test evaluation
        versus
City-wise holdout evaluation
```

This determines whether the model learns general real-estate relationships or primarily learns city-specific patterns.

Where applicable, the same principle should be considered for other real-estate classification tasks and image-based experiments by evaluating performance on appropriately held-out sources or distributions.

---

## 6. Explainability and Fairness

Explainability is particularly relevant to AIFS because the selected research literature includes work on explainable valuation, SHAP-based real-estate models, explainable spatial ML, and explainable/fair AI.

### Feature Contributions

The research should analyze which features contribute most strongly to predictions.

For property-price prediction:

- Feature importance should be analyzed.
- SHAP should be used for global feature contribution analysis.
- SHAP should be used for individual property predictions.
- Feature effects should be analyzed across different cities where sufficient data is available.

For fake-listing classification:

- Important classification features should be identified.
- Individual predictions should be explainable where possible.

For image-based models:

- Appropriate visual explainability methods, such as Grad-CAM, should be considered.
- The analysis should determine whether the model is focusing on meaningful image regions rather than irrelevant visual artifacts.

### Fairness and Error Analysis

Performance should be compared across meaningful groups such as:

- City
- Property type
- Price range
- Locality/property segment

For each group, analyze:

- MAE
- RMSE
- R²
- Accuracy
- Precision
- Recall
- F1 Score
- Prediction-error distributions

The analysis should determine whether a high overall performance hides significantly poorer performance for particular cities or property segments.

This is especially important because the selected literature includes research specifically addressing explainability and fairness in real-estate/financial ML systems.

---

## 7. Reproducibility

The project should contain sufficient information for another researcher to reproduce the experiments.

### Training and Processing

The repository should include:

- Training scripts
- Preprocessing scripts
- Feature-engineering procedures
- Evaluation scripts
- Inference/prediction scripts
- Image preprocessing procedures
- Image training procedures
- Image evaluation procedures

### Fixed Experimental Configuration

Document:

- Dataset versions
- Dataset sources
- Train/validation/test splits
- Random seeds
- Preprocessing procedures
- Feature-engineering procedures
- Model architectures
- Hyperparameters
- Learning rate
- Batch size
- Number of epochs
- Optimizer
- Loss function
- Data augmentation
- Image dimensions
- Transfer-learning configuration where applicable
- Hardware and software environment

### Saved Results

The repository should preserve:

- Trained model files
- Model configurations
- Feature names
- Feature-importance results
- Evaluation metrics
- Prediction outputs
- Training logs
- Image-model checkpoints
- Image-model evaluation results

### Visual Results

The repository should include:

- Prediction-versus-ground-truth plots
- Residual plots
- Training/validation curves
- Confusion matrices
- Feature-importance plots
- SHAP plots
- Image-model explainability visualizations
- City-wise performance plots
- Model-comparison plots

### Environment

Provide:

- `requirements.txt`
- Python version
- ML/DL framework versions
- Important library versions
- Hardware/GPU information where relevant
- Environment setup instructions

The complete repository should allow another researcher to understand the datasets, reproduce the preprocessing and training procedures, reproduce the experiments, and obtain comparable evaluation results.
