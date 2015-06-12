$(document).ready(function () {
    //Component - base class for View
    var Component = Backbone.View.extend({
        render: function () {

        },
        renderTo: function (el) {
            var templateName = el.attributes["template"].value,
                tempElement = document.createElement("div");

            tempElement.innerHTML = document.getElementById(templateName).childNodes[0].textContent;
            this.el = tempElement.querySelector(":first-child");
            this.render();
            el.parentNode.replaceChild(this.el, el);

        },
        updateBinds: function () {
            var model = this.model;
            if (model) {
                _.each(this.el.querySelectorAll("[data-bind-text]"), function (textEl) {
                    textEl.innerText = model.get(textEl.dataset.bindText);
                })
            }
        }
    })

    // Example View
    var TrafficLights = Component.extend({
        render: function () {
            this.updateBinds();
        }
    });

    //Example View
    var BettingLayer = Component.extend({});

    //Example Model
    var TrafficModel = Backbone.Model.extend({
        defaults: {
            Status: "Traffic status"
        }
    })


    //Map of available components/views
    var components = {
        BettingLayer: BettingLayer,
        TrafficLights: TrafficLights
    }

    //Map of available models
    var models = {
        TrafficModel: new TrafficModel()
    }

    //One time run DOM initialization process
    $("component").each(function (i, el) {

        var componentName = el.attributes["name"].value,
            modelName = el.attributes["model"] && el.attributes["model"].value,
            args = {},
            componentClass,
            component;

        if (componentClass = components[componentName]) {
            if (modelName && models[modelName]) {
                args.model = models[modelName];
            }
            component = new componentClass(args);
            component.renderTo(el);
        } else {
            throw new Error("Component " + componentName + " not found")
        }
    });
});