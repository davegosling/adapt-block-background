

define([
	'coreJS/adapt'
], function(Adapt) {

	var BlockBackgroundView = Backbone.View.extend({

		_blockModels: null,
		_blockModelsIndexed: null,
		$backgroundContainer: null,
		$backgrounds: null,
		$blockElements: null,
		_firstId: null,
		_activeId: null,

		initialize: function() {
			this._blockModels = this.model.findDescendantModels('blocks').filter(function(model) {
				return model.get("_blockBackground");
			});
			if(this._blockModels.length == 0) {
			        return;
			}
			this._blockModelsIndexed = _.indexBy(this._blockModels, "_id");

			this.listenTo(Adapt, "pageView:ready", this.onPageReady);
            
            //Is this the best way to swap out graphics - maybe best to add both graphics on load and then toggle classes on device:changed, device:resize?
            this.listenTo(Adapt, 'device:changed', this.onPageReady);
            this.listenTo(Adapt, 'device:resize', this.onPageReady);
            
			
		
		},

		onPageReady: function() {

			this.$blockElements = {};
			this.callbacks = {};
			
			for (var i = 0, l = this._blockModels.length; i < l; i++) {
				var blockModel = this._blockModels[i];				
				if(!blockModel.get('_blockBackground')) continue;

				var id = blockModel.get("_id");

				if (!this._firstId) this._firstId = id;

				var $blockElement = this.$el.find("."+ id);

				$blockElement.attr("data-block-background", id);
				this.$blockElements[id] = $blockElement;
				this.$blockElements[id].on("onscreen", this.callbacks[id]);


				var options = blockModel.get('_blockBackground');
                
                //Initially set the background graphic and height - this will be called on window resize and device
                this.setBackgroundGraphic($blockElement, options);
				
			}

			this._activeId = this._firstId;
			
	

		},
        setBackgroundGraphic: function($blockElement, options) {
            if (Adapt.device.screenSize === 'large') {
                $blockElement.addClass('block-background-block').remove('block-background-block-mobile').css({'background-image': 'url('+options.src+')', 'background-color': options.backgroundColor + ' !important', 'background-repeat': options.backgroundRepeat, 'background-size': options.backgroundSize, 'background-position':options.backgroundPosition, 'min-height' : options.bannerHeight + 'px'});
            } else {
                $blockElement.addClass('block-background-block-mobile').remove('block-background-block').css({'background-image': 'url('+options.mobileSrc+')', 'background-color': options.backgroundColor + ' !important', 'background-repeat': options.backgroundRepeat, 'background-size': options.backgroundSize, 'background-position':options.backgroundPosition, 'min-height' : options.mobileBannerHeight + 'px'});
            }
        }

	});

	Adapt.on("pageView:postRender", function(view) {
		var model = view.model;
		if (model.get("_blockBackground")) {
			if (model.get("_blockBackground")._isActive) {
				new BlockBackgroundView({model: model, el: view.el });
			}
		}
	});

});
