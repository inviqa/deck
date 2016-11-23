# Deck

Deck is a barebones starter theme for Drupal 8.

## Creating a subtheme

### Manually

1. Copy the `subtheme` directory into your `themes/custom` directory, naming it whatever you want.
2. Rename all files beginning with SUBTHEME to the chosen name of your subtheme (e.g. `deck.info.yml`).
3. Open the `package.json` and replace any instance of `{{ SUBTHEME }}` with the name of your subtheme.

### Automatically

Ensure you're using the Inviqa Drupal Gulp Tasks, and there should be a task available for performing the subtheme 
setup automatically.

