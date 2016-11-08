<?php

/**
 * @file
 * Page theme hook suggestions.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function deck_theme_suggestions_page_alter(array &$suggestions, array $variables) {

  /** @var \Drupal\node\Entity\Node $node */
  if ($node = \Drupal::routeMatch()->getParameter('node')) {
    $suggestions[] = 'page__node__' . $node->bundle();
  }

}
