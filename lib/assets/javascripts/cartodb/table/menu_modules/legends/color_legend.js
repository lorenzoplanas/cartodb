/**
 * ColorLegend
 */
cdb.admin.mod.ColorLegend = cdb.admin.mod.CustomLegend.extend({

  _FILTER_NAME: "color",

  _setupTemplates: function() {
    this.template           = this.getTemplate('table/menu_modules/legends/views/color_legend_pane');
    this.item_template_name = 'table/menu_modules/legends/views/color_legend_item'
  },

  _calculateItems: function() {

    var items = [];

    console.log(this.colors);

    this.colors = this.wizardProperties.properties.colors;

    if (this.colors) {

      _.each(this.colors, function(color) {
        items.push(new cdb.geo.ui.LegendItemModel({ name: color[0], value: color[1] } ));
      });

    }

    this.items.reset(items);

  },

  _renderItems: function() {

    //var savedItems = this._getSavedItems();
    //console.log('rendering colors', this.colors);

    if (this.colors) {
      this.$el.find(".no_content").hide();

      this.items.each(this._renderItem, this)

    } else {

      this.$el.find(".no_content").show();

    }

  },

  _renderItem: function(item) {

    var view = new cdb.admin.mod.LegendEditorItem({
      model: item,
      observe: "value",
      template_name: this.item_template_name
    });

    this.$el.find("ul").append(view.render().$el);
    this.addView(view);
  }

}

                                                             );

