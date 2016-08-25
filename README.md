# Inviqa Drupal generator

A [Yeoman](http://yeoman.io) generator to scaffold a Drupal 8 theme that follows the internal Inviqa workflow.

## Requirements

* NodeJS (any version)
* [Yeoman](http://yeoman.io)

```bash
npm install -g yo
```

* A directory to build your theme in

## Installation

```bash
npm install -g inviqa/generator-deck
```

## Usage

Navigate to the directory in which your theme will sit (i.e. `/web/themes/custom/deck`).

Generate your theme

```bash
yo deck
```

## FAQs

### Why "Deck"

Deck was the name of the original theme that was started before deciding to move to a Yeoman generator.

### Why a Yeoman generator and not a base theme

With the improvements in Drupal 8's theme layer, there is substantially less to do to strip a theme down to the bare minimum. This meant that there was no real need for a base theme. However, we still want a consistent theme structure, and Yeoman lens itself perfectly to this. Not creating a base theme, also gives us more scope for inheriting from other existing base themes, whilst also keeping our preferred project structure. For example; we can easily extend the [Bootstrap](https://www.drupal.org/project/bootstrap) base theme should we need to, which we wouldn't be able to easily if using Deck as a standard Drupal base theme.

Also, it's unlikely that any improvements made to a base theme would actually be implemented on existing sites, as there is a definite chance that there could be wider implications for established sites.

### Why is there no Gulpfile

Our preferred tool workflow has been split into a separate project.

### Why does it have to support early versions of Node

For maximum portability. Someone scaffolding the theme may not necessarily be the person working on the theme, and may have an earlier version of Node.

## Contribution

* The generator should work on any version of Node (i.e. no ES6 features).
* Ensure that any new features or changes have accompanying tests. The test suite runs with Mocha, and further documentation regarding writing tests for Yeoman can be found [here](http://yeoman.io/authoring/testing.html).
* Ensure that current code guidelines are followed.
* Ensure `npm test` passes prior to submitting any pull requests.

## License

 © [Matt Chapman](https://inviqa.com)
