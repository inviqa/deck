<?php

/**
 * @file
 * Image preprocess hooks.
 */

/**
 * Implements hook_preprocess_image().
 */
function deck_preprocess_image(&$variables) {

  // Get rid of the height and width attributes.
  unset(
    $variables['attributes']['width'],
    $variables['attributes']['height']
  );

}
