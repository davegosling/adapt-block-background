adapt-block-background
===============

Adds the option to implement a background graphic or colour to a block element.

The graphic defaults to a fullscreen 'cover' to act as a banner (if you implement a 'blank' component within the block).

You can set the min-height of this block to achieve the banner height you require. 

You can also set the 'background-size' and 'background-position' to allow different effects.  

NB: the background height will grow with the height of the components added to the block elememnt.

Usage
 ------

##Settings overview

Extends block data/model

####_blockBackground

Block background options object


####_blockBackground.src

This is the background image source used when page is viewed at desktop resolution

####_blockBackground.mobileSrc

This is the background image source used when page is viewed at mobile resolution

####_blockBackground.bannerHeight

This is the min-height of the block element when the page is viewed at desktop resolution

####_blockBackground.mobileBannerHeight
This is the min-height of the block element when the page is viewed at mobile resolution

####_blockBackground.backgroundSize

This is mapped to the background-size css attribute. Options are "cover", "auto" or "contain"

####_blockBackground.backgroundPosition

This is mapped to the background-position css attribute.  Options are "left","right","center","top","bottom".

####_blockBackground.backgroundRepeat

This is mapped to the background-repeat css attribute.  Options are "repeat","repeat-x","repeat-y","no-repeat".

####_blockBackground.backgroundColor

This is mapped to the background-color css attribute.

##Limitations

Background-position is limited to preset pairs of "left", "center", "right", "top", "bottom"

Background-size is limied to "cover","auto","contain".

Have to enable the extension on the course and the page - is this too annoying?  Should it just be at the block level?

##Browser spec

To Be Completed
