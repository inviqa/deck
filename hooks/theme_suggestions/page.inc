<?php
use Drupal\node\Entity\Node;

/**
 * @file
 * Page theme hook suggestions.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function deck_theme_suggestions_page_alter(array &$suggestions, array $variables) {

  /** @var \Drupal\node\Entity\Node $node */
  $node = \Drupal::routeMatch()->getParameter('node');

  // If $node isn't a node, but it is a node ID - then load the node.
  // An example of this failure is if you are viewing a node revision, it can break.
  if (!$node instanceof Node && is_numeric($node)) {
    $node = Node::load($node);
  }

  /** @var \Drupal\node\Entity\Node $node */
  if ($node instanceof Node) {
    $suggestions[] = 'page__node__' . $node->bundle();
  }

  // Add a theme suggestion for Views pages.
  if ($view_id = \Drupal::routeMatch()->getParameter('view_id')) {
    $suggestions[] = 'page__view__' . $view_id;
  }
}
