const Base = require("../Base");
const EmojiService = require("../utils/EmojiService");

class Elements extends Base {
  /**
   * Enum for TextBlock Styles
   * @enum {Readonly<String>}
   */
  TextColors = Object.freeze({
    default: "default",
    black: "dark",
    grey: "light",
    blue: "accent",
    green: "good",
    yellow: "warning",
    red: "attention",
  });

  /**
   * Enum for Text FontTypes
   * @enum {Readonly<String>}
   */
  TextFontTypes = Object.freeze({
    default: "default",
    monospace: "monospace",
  });

  /**
   * Enum for Text Sizes
   * @enum {Readonly<String>}
   */
  TextSizes = Object.freeze({
    default: "default",
    small: "small",
    medium: "medium",
    large: "large",
    xl: "extraLarge",
  });

  /**
   * Enum for Text Weights
   * @enum {Readonly<string>}
   */
  TextWeights = Object.freeze({
    default: "default",
    lighter: "lighter",
    bolder: "bolder",
  });

  /**
   * Enum for Text Styles
   * @enum {Readonly<string>}
   */
  TextStyles = Object.freeze({
    default: "default",
    heading: "heading",
  });

  /**
   * Enum for Image Sizes
   * @enum {Readonly<string>}
   */
  ImageSizes = Object.freeze({
    small: "small",
    medium: "medium",
    large: "large",
    stretch: "stretch",
    auto: "auto",
  });

  /**
   * Enum for Image Styles
   * @enum {Readonly<string>}
   */
  ImageStyles = Object.freeze({
    default: "default",
    rounded: "person",
  });

  /**
   * Displays text, allowing control over font sizes, weight, and color.
   * https://adaptivecards.io/explorer/TextBlock.html
   *
   * @param {String} text text content.
   * @param {('dark'|'light'|'accent'|'good'|'warning'|'attention'|'default')|(TextColors.black|TextColors.grey|TextColors.blue|TextColors.green|TextColors.yellow|TextColors.red|TextColors.default)} [color] optional color for the text. one if TextColors
   * @param {(undefined|'default'|'monospace')|(TextFontTypes.default|TextFontTypes.monospace)} [fontType] font type. one of TextFontTypes
   * @param {String} [horizontalAlignment = HAlign.left] text block horizontal alignment. defaults to left.
   * @param {Boolean} [isSubtle = false] should the text be subtle? Defaults to false.
   * @param {Number} [maxLines] optional maximum number of lines to be shown.
   * @param {('default'|'small'|'medium'|'large'|'extraLarge')|(TextSizes.default|TextSizes.small|TextSizes.medium|TextSizes.large|TextSizes.xl)} [size] text font size. one of TextSizes
   * @param {('default'|'lighter'|'bolder')|(TextWeights.default|TextWeights.lighter|TextWeights.bolder)} [weight] text font weight. one of TextWeights
   * @param {Boolean} [wrap = true] wrap the content in the given layout. Defaults to true.
   * @param {(undefined|'default'|'heading')|(TextStyles.default|TextStyles.heading)} [style = TextStyles.default] style of textblock. one of TextStyles
   * @param {String} [height] text block height. one of this.Height
   * @param {Boolean} [separator = false] should there be a separator on top. Defaults to false.
   * @param {('default'|'none'|'small'|'medium'|'large'|'extraLarge'|'padding')|(Spacing.default|Spacing.none|Spacing.small|Spacing.medium|Spacing.large|Spacing.xl|Spacing.padding)} [spacing] field spacing. one of this.Spacing
   * @param {String} [id] optional id for the text block
   * @param {Boolean} [isVisible = true] should the block be visible on render? Defaults to true.
   * @returns {object} text block object
   */
  textBlock({
    text,
    color,
    fontType,
    horizontalAlignment = this.HAlign.left,
    isSubtle = false,
    maxLines,
    size,
    weight,
    wrap = true,
    style = this.TextStyles.default,
    height,
    separator = false,
    spacing,
    id,
    isVisible = true,
  }) {
    let preparedText = text;
    if (text && typeof text === "string") {
      preparedText = text.replace(/\@\<+([^\>[]+)>+/g, "<at>$1</at>"); // replace @<something> with <at>something</at>
      preparedText = EmojiService.toUnicodeVersion(preparedText);
    }
    return {
      type: "TextBlock",
      text: preparedText,
      color,
      fontType,
      horizontalAlignment,
      isSubtle,
      maxLines,
      size,
      weight,
      wrap,
      style,
      height,
      separator,
      spacing,
      id,
      isVisible,
    };
  }

  /**
   * Displays an image. Acceptable formats are PNG, JPEG, and GIF
   * https://adaptivecards.io/explorer/Image.html
   *
   * @param {String} url image url.
   * @param {String} [altText = 'image'] alternate text describing the image.
   * @param {String} [backgroundColor] applies a background to a transparent image. This property will respect the image style. can have hex values
   * @param {String} [height] height of the element. Can be one of this.Height -OR- weight -> 50 -OR- pixels -> '50px'
   * @param {String} [horizontalAlignment = HAlign.left] horizontal alignment in container. Defaults to left.
   * @param {Object} [selectAction] on click action for the image.
   * @param {('small'|'medium'|'large'|'stretch'|'auto')|(ImageSizes.small|ImageSizes.medium|ImageSizes.large|ImageSizes.stretch|ImageSizes.auto)} [size] size of the image. one of this.ImageSizes
   * @param {('default'|'person')|(ImageStyles.default|ImageStyles.rounded)} [style] show squared image or rounded image. one of this.ImageStyles
   * @param {String} [width] width of the image. Can be one of this.Width -OR- weight -> 50 -OR- pixels -> '50px'
   * @param {Boolean} [separator = false] Show separator on top. Defaults to false.
   * @param {('default'|'none'|'small'|'medium'|'large'|'extraLarge'|'padding')|(Spacing.default|Spacing.none|Spacing.small|Spacing.medium|Spacing.large|Spacing.xl|Spacing.padding)} [spacing] field spacing. one of this.Spacing
   * @param {String} [id] id for the field.
   * @param {Boolean} [isVisible = true] Show field. Defaults to true.
   * @param {Boolean} [allowZoom = false] Show arrow icon at the top right to allow image zoom. Defaults to false
   * @return {object} image element.
   */
  image({
    url,
    altText = "image",
    backgroundColor,
    height,
    horizontalAlignment = this.HAlign.left,
    selectAction,
    size,
    style,
    width,
    separator = false,
    spacing,
    id,
    isVisible = true,
    allowZoom = false,
  }) {
    return {
      type: "Image",
      url,
      altText,
      backgroundColor,
      height,
      horizontalAlignment,
      selectAction,
      size,
      style,
      width,
      separator,
      spacing,
      id,
      isVisible,
      msTeams: allowZoom ? { allowExpand: true } : {},
    };
  }

  /**
   * Displays a media player for audio or video content.
   * https://adaptivecards.io/explorer/Media.html
   *
   * @param {Array<mediaSource>} sources array of media sources to attempt to play.
   * @param {String} [poster] URL of an image to display before playing. Supports data URI in version 1.2+
   * @param {String} [altText] alternate text describing the audio or video.
   * @param {String} [height] height of the element. Can be one of this.Height
   * @param {Boolean} [separator = false] Show separator on top. Defaults to false.
   * @param {('default'|'none'|'small'|'medium'|'large'|'extraLarge'|'padding')|(Spacing.default|Spacing.none|Spacing.small|Spacing.medium|Spacing.large|Spacing.xl|Spacing.padding)} [spacing] field spacing. one of this.Spacing
   * @param {String} [id] id for the field.
   * @param {Boolean} [isVisible = true] Show field. Defaults to true.
   * @return {object} media element.
   */
  media({
    sources,
    poster,
    altText,
    height,
    separator = false,
    spacing,
    id,
    isVisible = true,
  }) {
    return {
      type: "Media",
      sources,
      poster,
      altText,
      height,
      separator,
      spacing,
      id,
      isVisible,
    };
  }

  /**
   * Defines a source for a Media element
   * https://adaptivecards.io/explorer/MediaSource.html
   *
   * @param {String} mimeType mime type of associated media (e.g. "video/mp4").
   * @param {String} url URL to media. Supports data URI in version 1.2+
   * @return {object} media source object.
   */
  mediaSource({ mimeType, url }) {
    return { mimeType, url };
  }

  /**
   * Defines an array of inlines, allowing for inline text formatting.
   * https://adaptivecards.io/explorer/RichTextBlock.html
   *
   * @param {Array<textRun>|Array<String>} inlines The array of inlines.
   * @param {String} [horizontalAlignment = HAlign.left] text block horizontal alignment. defaults to left.
   * @param {String} [height] text block height. one of this.Height
   * @param {Boolean} [separator = false] should there be a separator on top. Defaults to false.
   * @param {('default'|'none'|'small'|'medium'|'large'|'extraLarge'|'padding')|(Spacing.default|Spacing.none|Spacing.small|Spacing.medium|Spacing.large|Spacing.xl|Spacing.padding)} [spacing] field spacing. one of this.Spacing
   * @param {String} [id] optional id for the text block
   * @param {Boolean} [isVisible = true] should the block be visible on render? Defaults to true.
   * @returns {object} rich text block object
   */
  richTextBlock({
    inlines,
    horizontalAlignment = this.HAlign.left,
    height,
    separator = false,
    spacing,
    id,
    isVisible = true,
  }) {
    return {
      type: "RichTextBlock",
      inlines,
      horizontalAlignment,
      height,
      separator,
      spacing,
      id,
      isVisible,
    };
  }

  /**
   * Defines a single run of formatted text.
   * A TextRun with no properties set can be represented in the json as string containing the text as a shorthand for the json object.
   * These two representations are equivalent.
   * https://adaptivecards.io/explorer/TextRun.html
   *
   * @param {String} text text to display. Markdown is not supported.
   * @param {('dark'|'light'|'accent'|'good'|'warning'|'attention'|'default')|(TextColors.black|TextColors.grey|TextColors.blue|TextColors.green|TextColors.yellow|TextColors.red|TextColors.default)} [color] optional color for the text. one if TextColors
   * @param {(undefined|'default'|'monospace')|(TextFontTypes.default|TextFontTypes.monospace)} [fontType] font type. one of TextFontTypes
   * @param {Boolean} [highlight = false] if true, displays the text highlighted.
   * @param {Boolean} [isSubtle = false] should the text be subtle? Defaults to false.
   * @param {Boolean} [italic = false] if true, displays the text using italic font.
   * @param {Object} [selectAction] on click action for the image.
   * @param {('default'|'small'|'medium'|'large'|'extraLarge')|(TextSizes.default|TextSizes.small|TextSizes.medium|TextSizes.large|TextSizes.xl)} [size] text font size. one of TextSizes
   * @param {Boolean} [strikethrough = false] if true, displays the text with strikethrough.
   * @param {Boolean} [underline = false] if true, displays the text with an underline.
   * @param {('default'|'lighter'|'bolder')|(TextWeights.default|TextWeights.lighter|TextWeights.bolder)} [weight] text font weight. one of TextWeights
   * @returns {object} text block object
   */
  textRun({
    text,
    color,
    fontType,
    highlight = false,
    isSubtle = false,
    italic = false,
    selectAction,
    strikethrough = false,
    underline = false,
    size,
    weight,
  }) {
    let preparedText = text;
    if (text && typeof text === "string") {
      preparedText = text.replace(/\@\<+([^\>[]+)>+/g, "<at>$1</at>"); // replace @<something> with <at>something</at>
      preparedText = EmojiService.toUnicodeVersion(preparedText);
    }
    return {
      type: "TextRun",
      text: preparedText,
      color,
      fontType,
      highlight,
      isSubtle,
      italic,
      selectAction,
      strikethrough,
      underline,
      size,
      weight,
    };
  }

  /**
   * Defines a people icon or persona for adaptive cards
   * https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cdesktop%2Cconnector-html#people-icon-in-an-adaptive-card
   *
   * @param {object} user the user whose icon needs to be displayed
   * @param {String} user.id the aad object id of the user (azure active directory id)
   * @param {String} user.name user'name
   * @param {String} user.email user's email address
   * @returns {object} people icon block object
   */
  userIcon(user) {
    const { id, name, email } = user;
    return {
      type: "Component",
      name: "graph.microsoft.com/user",
      view: "compact",
      properties: { id, displayName: name, userPrincipalName: email },
    };
  }

  /**
   * Defines a people icon set or persona for adaptive cards
   * Shows more than one person
   * https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cdesktop%2Cconnector-html#people-icon-in-an-adaptive-card
   *
   * @param {Array<{
   *   id: String,
   *   name: String,
   *   email: String,
   * }>} users array of users to be shown in the people icon set
   * @returns {object} people icon set block object
   */
  userIconSet(users) {
    return {
      type: "Component",
      name: "graph.microsoft.com/users",
      view: "compact",
      properties: {
        users: users.map((user) => ({
          id: user.id,
          displayName: user.name,
          userPrincipalName: user.email,
        })),
      },
    };
  }
}

module.exports = new Elements();
