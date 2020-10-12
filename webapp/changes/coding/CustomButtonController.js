/***
@controller Name:sap.suite.ui.generic.template.ListReport.view.ListReport,
*@viewId:cus.sd.salesorders.manage::sap.suite.ui.generic.template.ListReport.view.ListReport::C_SalesOrderWl_F1873
*/
sap.ui.define([
		'sap/ui/core/mvc/ControllerExtension'
	],
	function (
		ControllerExtension
	) {
		"use strict";
		return ControllerExtension.extend("customer.ManageSalesOrdersEXT1.CustomButtonController", {
			
			
			//Navigate to va01 - create sales order without parameters
			onCreateSalesOrder: function (oEvent) {
				var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
				
				var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
						target: {
							semanticObject: "SalesDocument",
							action: "create"
						}
					})) || "";

					oCrossAppNavigator.toExternal({
						target: {
							shellHash: hash
						}
					});
			},
			
			//Navigate to VA05 tcode
			onDispSalesOrders: function (oEvent) {
				var oSelectedItem = this.getView().byId("responsiveTable").getSelectedItem();
				var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
				
				//Navigates to search list because no item is selected
				if (oSelectedItem === null) {
					var hashNoSelect = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
						target: {
							semanticObject: "SalesOrder",
							action: "list"
						}
					})) || "";

					oCrossAppNavigator.toExternal({
						target: {
							shellHash: hashNoSelect
						}
					});
				} else {
					var sPath = this.getView().byId("responsiveTable").getSelectedItem().getBindingContext().sPath;
					var oModel = oEvent.getSource().getModel();
					var sSoldToParty = oModel.getData(sPath).ShipToParty;
					
					//Navigates to search results with selected Sold-To Party number 
					var hashSelect = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
						target: {
							semanticObject: "SalesOrder",
							action: "list"
						},
						params: {
							"SoldToParty": sSoldToParty
						}
					})) || "";
					oCrossAppNavigator.toExternal({
						target: {
							shellHash: hashSelect
						}
					});
				}
			}
		});
	});