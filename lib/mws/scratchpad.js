ScratchpadEnums['bde.Schedules'] = ["_15_MINUTES_", "_30_MINUTES_", "_1_HOUR_", "_2_HOURS_", "_4_HOURS_", "_8_HOURS_", "_12_HOURS_", "_72_HOURS_", "_1_DAY_", "_2_DAYS_", "_1_WEEK_", "_14_DAYS_", "_15_DAYS_", "_30_DAYS_", "_NEVER_"];
ScratchpadEnums['bde.FeedProcessingStatuses'] = ["_SUBMITTED_", "_IN_PROGRESS_", "_CANCELLED_", "_DONE_"];
ScratchpadEnums['bde.ReportProcessingStatuses'] = ["_SUBMITTED_", "_IN_PROGRESS_", "_CANCELLED_", "_DONE_", "_DONE_NO_DATA_"];
ScratchpadEnums['bde.Boolean'] = ["true", "false"];

ScratchpadApis['Feeds'] = {
	Name: "Datenübertragung an Amazon",
	Version: "2009-01-01",
	Groups: {
		"Feeds": {
			Name: "Datenübertragung an Amazon",
			Path: "/",
			ApiCalls: {
				"CancelFeedSubmissions": {
					Parameters: [
						{
							Name: 'FeedSubmissionIdList.Id.-',
							DisplayName: 'Übermittlungsnummer',
							List: true,
							Required: false
						},
						{Name: 'FeedTypeList.Type.-', DisplayName: 'Feedtyp', List: true},
						{Name: 'SubmittedFromDate', DisplayName: 'Gesendet von', Type: 'Timestamp'},
						{Name: 'SubmittedToDate', DisplayName: 'Gesendet an', Type: 'Timestamp'}
					]
				},
				"GetFeedSubmissionList": {
					Parameters: [
						{
							Name: 'FeedSubmissionIdList.Id.-',
							List: true,
							DisplayName: 'Übermittlungsnummer',
							Required: false
						},
						{Name: 'MaxCount', DisplayName: 'Max. Anzahl'},
						{Name: 'FeedTypeList.Type.-', DisplayName: 'Feedtyp', List: true},
						{
							Name: 'FeedProcessingStatusList.Status.-',
							DisplayName: 'Processing Status',
							List: true,
							Type: 'bde.FeedProcessingStatuses'
						},
						{Name: 'SubmittedFromDate', DisplayName: 'Gesendet von', Type: 'Timestamp'},
						{Name: 'SubmittedToDate', DisplayName: 'Gesendet an', Type: 'Timestamp'}
					]
				},
				"GetFeedSubmissionListByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}]
				},
				"GetFeedSubmissionCount": {
					Parameters: [
						{Name: 'FeedTypeList.Type.-', DisplayName: 'Feedtyp', List: true},
						{
							Name: 'FeedProcessingStatusList.Status.-',
							DisplayName: 'Status wird verarbeitet',
							List: true,
							Type: 'bde.FeedProcessingStatuses'
						},
						{Name: 'SubmittedFromDate', DisplayName: 'Gesendet von', Type: 'Timestamp'},
						{Name: 'SubmittedToDate', DisplayName: 'Gesendet an', Type: 'Timestamp'}
					]
				},
				"GetFeedSubmissionResult": {
					Parameters: [{Name: 'FeedSubmissionId', DisplayName: 'Übermittlungsnummer', Required: true}]
				},
				"SubmitFeed": {
					Parameters: [
						{Name: 'FeedType', DisplayName: 'Feedtyp', Required: true},
						{Name: 'MarketplaceIdList.Id.-', DisplayName: 'Marketplace-ID', List: true, Required: false},
						{
							Name: 'PurgeAndReplace',
							DisplayName: 'Purge/Replace (Löschen/Ersetzen)',
							Required: false,
							Type: 'Checkbox'
						}
					],
					ShowFeed: true
				}
			}
		}
	}
};

ScratchpadApis['Reports'] = {
	Name: "Berichte",
	Version: "2009-01-01",
	Groups: {
		"Reports": {
			Name: "Berichte",
			Path: "/",
			ApiCalls: {
				"GetReport": {
					Parameters: [{Name: 'ReportId', DisplayName: 'Berichtsnummer', Required: true}]
				},
				"GetReportCount": {
					Parameters: [
						{Name: 'ReportTypeList.Type.-', DisplayName: 'Berichtstyp', List: true},
						{Name: 'Acknowledged', DisplayName: 'Bestätigt', Type: 'bde.Boolean'},
						{Name: 'AvailableFromDate', DisplayName: 'Erhältlich von', Type: 'Timestamp'},
						{Name: 'AvailableToDate', DisplayName: 'Verfügbar für', Type: 'Timestamp'}
					]
				},
				"GetReportList": {
					Parameters: [
						{Name: 'MaxCount', DisplayName: 'Max. Anzahl'},
						{Name: 'ReportTypeList.Type.-', DisplayName: 'Berichtstyp', List: true},
						{Name: 'Acknowledged', DisplayName: 'Bestätigt', Type: 'bde.Boolean'},
						{Name: 'AvailableFromDate', DisplayName: 'Erhältlich von', Type: 'Timestamp'},
						{Name: 'AvailableToDate', DisplayName: 'Verfügbar für', Type: 'Timestamp'},
						{Name: "ReportRequestIdList.Id.-", DisplayName: 'Berichtsnummer', List: true}
					]
				},
				"GetReportListByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}]
				},
				"GetReportRequestCount": {
					Parameters: [
						{Name: 'RequestedFromDate', DisplayName: 'Angefordert von', Type: 'Timestamp'},
						{Name: 'RequestedToDate', DisplayName: 'Angefordert zu', Type: 'Timestamp'},
						{Name: 'ReportTypeList.Type.-', DisplayName: 'Berichtstyp', List: true},
						{
							Name: 'ReportProcessingStatusList.Status.-',
							DisplayName: 'Status wird verarbeitet',
							List: true,
							Type: 'bde.ReportProcessingStatuses'
						}
					]
				},
				"GetReportRequestList": {
					Parameters: [
						{Name: 'MaxCount', DisplayName: 'Max. Anzahl'},
						{Name: 'RequestedFromDate', DisplayName: 'Angefordert von', Type: 'Timestamp'},
						{Name: 'RequestedToDate', DisplayName: 'Angefordert zu', Type: 'Timestamp'},
						{Name: "ReportRequestIdList.Id.-", DisplayName: 'Berichtsnummer', List: true},
						{Name: 'ReportTypeList.Type.-', DisplayName: 'Berichtstyp', List: true},
						{
							Name: 'ReportProcessingStatusList.Status.-',
							DisplayName: 'Status wird verarbeitet',
							List: true,
							Type: 'bde.ReportProcessingStatuses'
						}
					]
				},
				"GetReportRequestListByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}]
				},
				"CancelReportRequests": {
					Parameters: [
						{Name: 'RequestedFromDate', DisplayName: 'Angefordert von', Type: 'Timestamp'},
						{Name: 'RequestedToDate', DisplayName: 'Angefordert zu', Type: 'Timestamp'},
						{Name: "ReportRequestIdList.Id.-", DisplayName: 'Berichtsnummer', List: true},
						{Name: 'ReportTypeList.Type.-', DisplayName: 'Berichtstyp', List: true},
						{
							Name: 'ReportProcessingStatusList.Status.-',
							DisplayName: 'Status wird verarbeitet',
							List: true,
							Type: 'bde.ReportProcessingStatuses'
						}
					]
				},
				"RequestReport": {
					Parameters: [
						{Name: 'ReportType', DisplayName: 'Berichtstyp', Required: true},
						{Name: 'MarketplaceIdList.Id.-', DisplayName: 'Marketplace-ID', List: true, Required: false},
						{Name: 'StartDate', DisplayName: 'Startdatum', Type: 'Timestamp'},
						{Name: 'EndDate', DisplayName: 'Enddatum', Type: 'Timestamp'},
						{Name: 'ReportOptions', DisplayName: 'Report Options', Required: false}
					]
				}
			}
		},

		"ReportSchedule": {
			Name: "Planen von Berichten",
			Path: "/",
			ApiCalls: {
				"ManageReportSchedule": {
					Parameters: [
						{Name: 'ReportType', DisplayName: 'Berichtstyp', Required: true},
						{Name: 'Schedule', DisplayName: 'Terminplan', Type: 'bde.Schedules', Required: true},
						{Name: 'ScheduleDate', DisplayName: 'Termin', Type: 'Timestamp'}
					]
				},
				"GetReportScheduleList": {
					Parameters: [{Name: 'ReportTypeList.Type.-', DisplayName: 'Berichtstyp', List: true}]
				},
				"GetReportScheduleListByNextToken": {
					Parameters: [{Name: 'NextToken.-', DisplayName: 'Nächster Token', Required: true}]
				},
				"GetReportScheduleCount": {
					Parameters: [{Name: 'ReportTypeList.Type.-', DisplayName: 'Berichtstyp', List: true}]
				},
				"UpdateReportAcknowledgements": {
					Parameters: [
						{Name: 'ReportIdList.Id.-', List: true, DisplayName: 'Berichtsnummer', Required: true},
						{Name: 'Acknowledged', DisplayName: 'Bestätigt', Type: 'bde.Boolean'}
					]
				}
			}
		} // end of ReportSchedule
	} // end of groups
};

ScratchpadEnums['fba.ResponseGroups'] = ["Basic", "Detailed"];
ScratchpadEnums['fba.ShippingSpeedCategory'] = ["Standard", "Expedited", "Priority"];
ScratchFBAOutboundParameters = {};

ScratchpadEnums['fba.FulfillmentPolicy'] = ["FillOrKill", "FillAll", "FillAllAvailable"];
ScratchpadEnums['fba.PageType'] = ["PackageLabel_Letter_2", "PackageLabel_Letter_4", "PackageLabel_Letter_6", "PackageLabel_A4_4", "PackageLabel_Plain_Paper"];
ScratchpadEnums['fba.ShipmentType'] = ["SP", "LTL", "TL"];
ScratchpadEnums['fba.UnitOfMeasure'] = ["inches", "centimeters"];
ScratchpadEnums['fba.UnitOfWeight'] = ["pounds", "kilograms"];
ScratchpadEnums['fba.SellerFreightClass'] = ['50', '55', '60', '65', '70', '77.5', '85', '92.5', '100', '110', '125', '150', '175', '200', '250', '300', '400', '500'];
ScratchpadEnums['fba.CurrencyCode'] = ['USD', 'GBP'];
ScratchpadEnums['fba.CarrierName'] = ['UNITED_PARCEL_SERVICE_INC', 'DHL_STANDARD'];

ScratchPadFulfillmentByAmazonParameters = {};
ScratchPadFulfillmentByAmazonParameters.PartneredSmallParcelDataCarrierName =
{
	Name: "TransportDetails.PartneredSmallParcelData.CarrierName",
	DisplayName: "Carrier Name",
	Required: false,
	Type: "fba.CarrierName"
};

ScratchpadApis['FulfillmentByAmazon'] = {
	Name: "Fulfillment",
	Version: "2010-10-01",
	Groups: {
		"FulfillmentInbound": {
			Name: "Sendungen an Amazon",
			Path: "/FulfillmentInboundShipment/2010-10-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"GetPreorderInfo": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true}
					]
				},
				"ConfirmPreorder": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true},
						{Name: "NeedByDate", DisplayName: "Need By Date", Type: 'DateString', Required: true}
					]
				},
				"ConfirmTransportRequest": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true}
					]
				},
				"CreateInboundShipment": {
					Parameters: [
						{Name: "ShipmentId", DisplayName: "Versandnummer", Required: true},
						{
							Name: "Inbound Shipment Header",
							DisplayName: "Eingehende Lieferung - Kopfzeile",
							Type: 'Complex',
							Required: true,
							Parameters: [
								{
									Name: "InboundShipmentHeader.ShipmentName",
									DisplayName: "Lieferungsname",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.Name",
									DisplayName: "Name",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.AddressLine1",
									DisplayName: "Adresszeile 1",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.City",
									DisplayName: "Stadt",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.StateOrProvinceCode",
									DisplayName: "Bundesstaat/Provinz",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.PostalCode",
									DisplayName: "Postleitzahl",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.CountryCode",
									DisplayName: "Land",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.DestinationFulfillmentCenterId",
									DisplayName: "Ziel. FC-Nummer",
									Required: true
								},
								{Name: "InboundShipmentHeader.ShipmentStatus", DisplayName: "Status der Sendung"},
								{
									Name: "InboundShipmentHeader.LabelPrepPreference",
									DisplayName: "Etikett - Prep bevorzugt"
								}
							]
						},
						{
							Name: "InboundShipmentItems",
							DisplayName: "Eingehende Lieferung - Artikel",
							Type: 'ComplexList',
							List: true,
							Required: true,
							Parameters: [
								{Name: "InboundShipmentItems.member.-.QuantityShipped", DisplayName: "Menge"},
								{Name: "InboundShipmentItems.member.-.SellerSKU", DisplayName: "SKU"},
								{
									Name: 'PrepDetailsList',
									DisplayName: 'Plan Request Items Prep List',
									Required: true,
									List: true,
									Type: 'Complex',
									Parameters: [
										{
											Name: "InboundShipmentItems.member.-.PrepDetailsList.PrepDetails.-.PrepInstruction",
											DisplayName: "Prep Instruction"
										},
										{
											Name: "InboundShipmentItems.member.-.PrepDetailsList.PrepDetails.-.PrepOwner",
											DisplayName: "Prep Owner"
										}
									]
								}
							]
						},
						{
							Name: "Inbound Shipment Header",
							DisplayName: "Eingehende Lieferung - Kopfzeile",
							Type: 'Complex',
							Required: false,
							Parameters: [
								{
									Name: "InboundShipmentHeader.ShipFromAddress.AddressLine2",
									DisplayName: "Adresszeile 2",
									Required: false
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.DistrictOrCounty",
									DisplayName: "District or County",
									Required: false
								}
							]
						}

					]
				},
				"CreateInboundShipmentPlan": {
					Parameters: [
						{Name: 'LabelPrepPreference', DisplayName: "Etikett - Prep bevorzugt", Required: true},
						{
							Name: 'ShipFromAddress',
							DisplayName: "Versand-Von-Adresse:",
							Required: true,
							Type: 'Complex',
							Parameters: [
								{Name: 'ShipFromAddress.Name', DisplayName: "Name"},
								{Name: 'ShipFromAddress.AddressLine1', DisplayName: "Adresszeile 1"},
								{Name: 'ShipFromAddress.City', DisplayName: "Stadt"},
								{Name: 'ShipFromAddress.StateOrProvinceCode', DisplayName: "Bundesstaat/Provinz"},
								{Name: 'ShipFromAddress.PostalCode', DisplayName: "Postleitzahl"},
								{Name: 'ShipFromAddress.CountryCode', DisplayName: "Land"},
							]
						},
						{
							Name: 'InboundShipmentPlanRequestItems',
							DisplayName: 'Plan Request Items',
							Required: true,
							List: true,
							Type: 'ComplexList',
							Parameters: [
								{Name: "InboundShipmentPlanRequestItems.member.-.SellerSKU", DisplayName: "SKU"},
								{Name: "InboundShipmentPlanRequestItems.member.-.ASIN", DisplayName: "ASIN"},
								{Name: "InboundShipmentPlanRequestItems.member.-.Quantity", DisplayName: "Menge"},
								{Name: "InboundShipmentPlanRequestItems.member.-.Condition", DisplayName: "Zustand"},
								{
									Name: 'PrepDetailsList',
									DisplayName: 'Plan Request Items Prep List',
									Required: true,
									List: true,
									Type: 'Complex',
									Parameters: [
										{
											Name: "InboundShipmentPlanRequestItems.member.-.PrepDetailsList.PrepDetails.-.PrepInstruction",
											DisplayName: "Prep Instruction"
										},
										{
											Name: "InboundShipmentPlanRequestItems.member.-.PrepDetailsList.PrepDetails.-.PrepOwner",
											DisplayName: "Prep Owner"
										}
									]
								}
							]
						},
						{
							Name: 'ShipFromAddress',
							DisplayName: "Versand-Von-Adresse:",
							Required: false,
							Type: 'Complex',
							Parameters: [
								{Name: 'ShipFromAddress.AddressLine2', DisplayName: "Adresszeile 2"},
								{Name: 'ShipFromAddress.DistrictOrCounty', DisplayName: "District or County"}
							]
						},
						{Name: "ShipToCountryCode", DisplayName: "Ship to Country Code", Required: false},
						{Name: "ShipToCountrySubdivisionCode", DisplayName: "Ship to Subdivision Code", Required: false}
					]
				},
				"EstimateTransportRequest": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true}
					]
				},
				"GetBillOfLading": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true}
					]
				},
				"GetPalletLabels": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true},
						{Name: 'PageType', DisplayName: "Page Type", Required: true, Type: 'fba.PageType'},
						{Name: 'NumberOfPallets', DisplayName: "Number of Pallets", Required: true}
					]
				},
				"GetPackageLabels": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true},
						{Name: 'PageType', DisplayName: "Page Type", Required: true, Type: 'fba.PageType'},
						{Name: 'NumberOfPackages', DisplayName: "Number of Packages", Required: false}
					]
				},
				"GetUniquePackageLabels": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true},
						{Name: 'PageType', DisplayName: "Page Type", Required: true, Type: 'fba.PageType'},
						{
							Name: 'PackageLabelsToPrint.member.-',
							DisplayName: "List of PackageLabelsToPrint. Scratchpad limits this list to 20 values.",
							List: true,
							Required: true
						}
					]
				},
				"GetTransportContent": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true}
					]
				},
				"ListInboundShipmentItems": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true},
						{Name: 'LastUpdatedAfter', DisplayName: 'Zuletzt aktualisiert nach', Type: 'Timestamp'},
						{Name: 'LastUpdatedBefore', DisplayName: 'Zuletzt aktualisiert vor', Type: 'Timestamp'}
					]
				},
				"ListInboundShipmentItemsByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: "Nächster Token", Required: true}]
				},
				"ListInboundShipments": {
					Parameters: [
						{
							Name: 'ShipmentStatusList.member.-',
							DisplayName: "Status der Sendung",
							List: true,
							Required: false
						},
						{Name: 'ShipmentIdList.member.-', DisplayName: "Versandnummer", List: true, Required: false},
						{Name: 'LastUpdatedAfter', DisplayName: 'Zuletzt aktualisiert nach', Type: 'Timestamp'},
						{Name: 'LastUpdatedBefore', DisplayName: 'Zuletzt aktualisiert vor', Type: 'Timestamp'}
					]
				},
				"ListInboundShipmentsByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: "Nächster Token", Required: true}]
				},
				"PutTransportContent": {
					Parameters: [
						{Name: "ShipmentId", DisplayName: "Versandnummer", Required: true},
						{Name: "IsPartnered", DisplayName: "Is Partnered", Required: true, Type: "bde.Boolean"},
						{Name: "ShipmentType", DisplayName: "Shipment Type", Required: true, Type: "fba.ShipmentType"},
						{
							Name: 'TransportDetails',
							DisplayName: "Transport Details",
							Required: false,
							Type: 'Complex',
							Parameters: [
								{
									Name: "TransportDetails.PartneredSmallParcelData",
									DisplayName: "Partnered Small Parcel Data",
									Required: false,
									Type: 'Complex',
									Parameters: [
										ScratchPadFulfillmentByAmazonParameters.PartneredSmallParcelDataCarrierName,
										{
											Name: "TransportDetails.PartneredSmallParcelData.PackageList",
											DisplayName: "Package List",
											Type: 'Complex',
											List: true,
											Required: false,
											Parameters: [
												{
													Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.PackageNumber",
													DisplayName: "Paketnummer"
												},
												{
													Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Weight.Value",
													DisplayName: "Weight"
												},
												{
													Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Weight.Unit",
													DisplayName: "Unit",
													Type: 'fba.UnitOfWeight'
												},
												{
													Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Dimensions.Length",
													DisplayName: "Length"
												},
												{
													Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Dimensions.Width",
													DisplayName: "Width"
												},
												{
													Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Dimensions.Height",
													DisplayName: "Height"
												},
												{
													Name: "TransportDetails.PartneredSmallParcelData.PackageList.member.-.Dimensions.Unit",
													DisplayName: "Unit",
													Type: 'fba.UnitOfMeasure'
												}
											]
										}
									]
								},
								{
									Name: "TransportDetails.NonPartneredSmallParcelData",
									DisplayName: "",
									Required: false,
									Type: 'Complex',
									Parameters: [
										{
											Name: "TransportDetails.NonPartneredSmallParcelData.CarrierName",
											DisplayName: "Carrier Name"
										},
										{
											Name: "TransportDetails.NonPartneredSmallParcelData.PackageList",
											DisplayName: "Package List",
											Type: 'Complex',
											List: true,
											Required: false,
											Parameters: [
												{
													Name: "TransportDetails.NonPartneredSmallParcelData.PackageList.member.-.PackageNumber",
													DisplayName: "Paketnummer"
												},
												{
													Name: "TransportDetails.NonPartneredSmallParcelData.PackageList.member.-.TrackingId",
													DisplayName: "Tracking Id"
												},
											]
										}
									]
								},
								{
									Name: "TransportDetails.PartneredLtlData",
									DisplayName: "",
									Required: false,
									Type: 'Complex',
									Parameters: [
										{
											Name: "TransportDetails.PartneredLtlData.Contact.Name",
											DisplayName: "Name",
											Required: false
										},
										{
											Name: "TransportDetails.PartneredLtlData.Contact.Phone",
											DisplayName: "",
											Required: false
										},
										{
											Name: "TransportDetails.PartneredLtlData.Contact.Email",
											DisplayName: "",
											Required: false
										},
										{
											Name: "TransportDetails.PartneredLtlData.Contact.Fax",
											DisplayName: "",
											Required: false
										},
										{
											Name: "TransportDetails.PartneredLtlData.Contact.BoxCount",
											DisplayName: "",
											Required: false
										},
										{
											Name: "TransportDetails.PartneredLtlData.Contact.SellerFreightClass",
											DisplayName: "",
											Type: 'fba.SellerFreightClass',
											Required: false
										},
										{
											Name: "TransportDetails.PartneredLtlData.FreightReadyDate",
											DisplayName: "",
											Type: 'DateString',
											Required: false
										},
										{
											Name: "TransportDetails.PartneredLtlData.PalletList",
											DisplayName: "",
											Type: 'Complex',
											List: 'true',
											Required: false,
											Parameters: [
												{
													Name: "TransportDetails.PartneredLtlData.PalletList.member.-.PalletNumber",
													DisplayName: "",
													Required: false
												},
												{
													Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Dimensions.Length",
													DisplayName: "",
													Required: false
												},
												{
													Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Dimensions.Width",
													DisplayName: "",
													Required: false
												},
												{
													Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Dimensions.Height",
													DisplayName: "",
													Required: false
												},
												{
													Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Dimensions.Unit",
													DisplayName: "",
													Type: 'fba.UnitOfMeasure',
													Required: false
												},
												{
													Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Weight.Value",
													DisplayName: "Weight"
												},
												{
													Name: "TransportDetails.PartneredLtlData.PalletList.member.-.Weight.Unit",
													DisplayName: "Unit",
													Type: 'fba.UnitOfWeight'
												},
												{
													Name: "TransportDetails.PartneredLtlData.PalletList.member.-.IsStacked",
													DisplayName: "Is Stacked",
													Type: 'bde.Boolean',
													Required: false
												},
											]
										},
										{
											Name: "TransportDetails.PartneredLtlData.TotalWeight.Value",
											DisplayName: "Total Weight"
										},
										{
											Name: "TransportDetails.PartneredLtlData.TotalWeight.Unit",
											DisplayName: "Unit",
											Type: 'fba.UnitOfWeight'
										},
										{
											Name: "TransportDetails.PartneredLtlData.SellerDeclaredValue.Value",
											DisplayName: ""
										},
										{
											Name: "TransportDetails.PartneredLtlData.SellerDeclaredValue.CurrencyCode",
											DisplayName: "Currency Code",
											Type: 'fba.CurrencyCode'
										},
									]
								},
								{
									Name: "TransportDetails.NonPartneredLtlData",
									DisplayName: "",
									Required: false,
									Type: 'Complex',
									Parameters: [
										{
											Name: "TransportDetails.NonPartneredLtlData.CarrierName",
											DisplayName: "Carrier Name",
											Required: false
										},
										{
											Name: "TransportDetails.NonPartneredLtlData.ProNumber",
											DisplayName: "Pro Number",
											Required: false
										},
									]
								},
							]
						}
					]
				},
				"VoidTransportRequest": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true}
					]
				},
				"UpdateInboundShipment": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: "Versandnummer", Required: true},
						{
							Name: "Inbound Shipment Header",
							DisplayName: "Eingehende Lieferung - Kopfzeile",
							Type: 'Complex',
							Required: true,
							Parameters: [
								{
									Name: "InboundShipmentHeader.ShipmentName",
									DisplayName: "Lieferungsname",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.Name",
									DisplayName: "Name",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.AddressLine1",
									DisplayName: "Adresszeile 1",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.AddressLine2",
									DisplayName: "Adresszeile 2",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.City",
									DisplayName: "Stadt",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.StateOrProvinceCode",
									DisplayName: "Bundesstaat/Provinz",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.PostalCode",
									DisplayName: "Postleitzahl",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.CountryCode",
									DisplayName: "Land",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.ShipFromAddress.DistrictOrCounty",
									DisplayName: "District or County",
									Required: true
								},
								{
									Name: "InboundShipmentHeader.DestinationFulfillmentCenterId",
									DisplayName: "Ziel. FC-Nummer",
									Required: true
								},
								{Name: "InboundShipmentHeader.ShipmentStatus", DisplayName: "Status der Sendung"},
								{
									Name: "InboundShipmentHeader.LabelPrepPreference",
									DisplayName: "Etikett - Prep bevorzugt"
								}
							]
						},
						{
							Name: "InboundShipmentItems",
							DisplayName: "Eingehende Lieferung - Artikel",
							Type: 'ComplexList',
							List: true,
							Required: true,
							Parameters: [
								{Name: "InboundShipmentItems.member.-.QuantityShipped", DisplayName: "Menge"},
								{Name: "InboundShipmentItems.member.-.SellerSKU", DisplayName: "SKU"},
								{
									Name: 'PrepDetailsList',
									DisplayName: 'Plan Request Items Prep List',
									Required: true,
									List: true,
									Type: 'Complex',
									Parameters: [
										{
											Name: "InboundShipmentItems.member.-.PrepDetailsList.PrepDetails.-.PrepInstruction",
											DisplayName: "Prep Instruction"
										},
										{
											Name: "InboundShipmentItems.member.-.PrepDetailsList.PrepDetails.-.PrepOwner",
											DisplayName: "Prep Owner"
										}
									]
								}
							]
						}
					]
				},
				"GetPrepInstructionsForSKU": {
					Parameters: [
						{
							Name: "SellerSKUList", DisplayName: "", Type: 'Complex', Required: true,
							Parameters: [
								{Name: "SellerSKUList.Id.-", DisplayName: "SKU", List: true, Required: true}
							]
						},
						{Name: "ShipToCountryCode", DisplayName: "Ship to Country Code", Required: true}
					]
				},
				"GetPrepInstructionsForASIN": {
					Parameters: [
						{
							Name: "ASINList", DisplayName: "Seller ASIN List", Type: 'Complex', Required: true,
							Parameters: [
								{Name: "ASINList.Id.-", DisplayName: "ASIN", List: true, Required: true}
							]
						},
						{Name: "ShipToCountryCode", DisplayName: "Ship to Country Code", Required: true}
					]
				}
			}
		},

		"FulfillmentInventory": {
			Name: "Lagerbestand in Versandzentren",
			Path: "/FulfillmentInventory/2010-10-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"ListInventorySupply": {
					Parameters: [
						{Name: 'SellerSkus.member.-', DisplayName: "SKU", List: true},
						{Name: 'QueryStartDateTime', DisplayName: "Startzeit", Type: 'Timestamp'},
						{Name: 'ResponseGroup', DisplayName: "", Type: 'fba.ResponseGroups'},
						{Name: 'MarketplaceId', DisplayName: ""}
					]
				},
				"ListInventorySupplyByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: "Nächster Token", Required: true}]
				}
			}
		},

		"FulfillmentOutbound": {
			Name: "Sendungen an Käufer",
			Path: "/FulfillmentOutboundShipment/2010-10-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"CancelFulfillmentOrder": {
					Parameters: [
						{Name: 'SellerFulfillmentOrderId', DisplayName: "Fulfillment-Auftragsnummer", Required: true}
					]
				},
				"CreateFulfillmentOrder": {
					Parameters: [
						{Name: 'SellerFulfillmentOrderId', DisplayName: "Fulfillment-Auftragsnummer", Required: true},
						{
							Name: 'ShippingSpeedCategory',
							DisplayName: "Versandgeschwindigkeit -Kategorie",
							Required: true,
							Type: 'fba.ShippingSpeedCategory'
						},
						{Name: 'DisplayableOrderId', DisplayName: "Bestellnr.", Required: true},
						{Name: 'DisplayableOrderDateTime', DisplayName: "Date", Required: true, Type: 'Timestamp'},
						{Name: 'DisplayableOrderComment', DisplayName: "Kommentar", Required: true},
						{
							Name: 'FulfillmentPolicy',
							DisplayName: "Fulfillment-Richtlinie",
							Required: false,
							Type: 'fba.FulfillmentPolicy'
						},
						{Name: 'FulfillmentAction', DisplayName: "Fulfillment Action", Required: false},
						{
							Name: 'NotificationEmailList.member.-',
							DisplayName: "E-Mail-Benachrichtigung",
							Required: false,
							List: true
						},
						{
							Name: 'DestinationAddress', DisplayName: "Zieladresse", Required: true, Type: 'Complex',
							Parameters: [
								{Name: 'DestinationAddress.Name', DisplayName: "Name"},
								{Name: 'DestinationAddress.Line1', DisplayName: "Adresszeile 1"},
								{Name: 'DestinationAddress.Line2', DisplayName: "Adresszeile 2"},
								{Name: 'DestinationAddress.Line3', DisplayName: "Address 3"},
								{Name: 'DestinationAddress.City', DisplayName: "Stadt"},
								{Name: 'DestinationAddress.StateOrProvinceCode', DisplayName: "Bundesstaat/Provinz"},
								{Name: 'DestinationAddress.PostalCode', DisplayName: "Postleitzahl"},
								{Name: 'DestinationAddress.CountryCode', DisplayName: "Land"},
								{Name: 'DestinationAddress.DistrictOrCounty', DisplayName: "District or County"},
								{Name: 'DestinationAddress.PhoneNumber', DisplayName: "Phone Number"}
							]
						},
						{
							Name: 'Items', DisplayName: "Items", Type: 'Complex', Required: true, List: true,
							Parameters: [
								{Name: 'Items.member.-.DisplayableComment', DisplayName: "Anzeigbarer Kommentar"},
								{Name: 'Items.member.-.GiftMessage', DisplayName: "Geschenknachricht"},
								{Name: 'Items.member.-.PerUnitDeclaredValue.Value', DisplayName: "Deklarierter Wert"},
								{
									Name: 'Items.member.-.PerUnitDeclaredValue.CurrencyCode',
									DisplayName: "Deklarierte Währung"
								},
								{Name: 'Items.member.-.FulfillmentNetworkSKU', DisplayName: "Fulfillment Network SKU"},
								{Name: 'Items.member.-.Quantity', DisplayName: "Menge"},
								{
									Name: 'Items.member.-.SellerFulfillmentOrderItemId',
									DisplayName: "Fulfillment-Auftrag Artikelnummer"
								},
								{Name: 'Items.member.-.SellerSKU', DisplayName: "SKU"}
							]
						}
					]
				},
				"UpdateFulfillmentOrder": {
					Parameters: [
						{Name: 'SellerFulfillmentOrderId', DisplayName: "Fulfillment-Auftragsnummer", Required: true},
						{
							Name: 'ShippingSpeedCategory',
							DisplayName: "Versandgeschwindigkeit -Kategorie",
							Required: false,
							Type: 'fba.ShippingSpeedCategory'
						},
						{Name: 'DisplayableOrderId', DisplayName: "Bestellnr.", Required: false},
						{Name: 'DisplayableOrderDateTime', DisplayName: "Date", Required: false, Type: 'Timestamp'},
						{Name: 'DisplayableOrderComment', DisplayName: "Kommentar", Required: false},
						{
							Name: 'FulfillmentPolicy',
							DisplayName: "Fulfillment-Richtlinie",
							Required: false,
							Type: 'fba.FulfillmentPolicy'
						},
						{Name: 'FulfillmentAction', DisplayName: "Fulfillment Action", Required: false},
						{
							Name: 'NotificationEmailList.member.-',
							DisplayName: "E-Mail-Benachrichtigung",
							Required: false,
							List: true
						},
						{
							Name: 'DestinationAddress', DisplayName: "Zieladresse", Required: false, Type: 'Complex',
							Parameters: [
								{Name: 'DestinationAddress.Name', DisplayName: "Name"},
								{Name: 'DestinationAddress.Line1', DisplayName: "Adresszeile 1"},
								{Name: 'DestinationAddress.Line2', DisplayName: "Adresszeile 2"},
								{Name: 'DestinationAddress.Line3', DisplayName: "Address 3"},
								{Name: 'DestinationAddress.City', DisplayName: "Stadt"},
								{Name: 'DestinationAddress.StateOrProvinceCode', DisplayName: "Bundesstaat/Provinz"},
								{Name: 'DestinationAddress.PostalCode', DisplayName: "Postleitzahl"},
								{Name: 'DestinationAddress.CountryCode', DisplayName: "Land"},
								{Name: 'DestinationAddress.DistrictOrCounty', DisplayName: "District or County"},
								{Name: 'DestinationAddress.PhoneNumber', DisplayName: "Phone Number"}
							]
						},
						{
							Name: 'Items', DisplayName: "Items", Type: 'Complex', Required: false, List: true,
							Parameters: [
								{Name: 'Items.member.-.DisplayableComment', DisplayName: "Anzeigbarer Kommentar"},
								{Name: 'Items.member.-.GiftMessage', DisplayName: "Geschenknachricht"},
								{Name: 'Items.member.-.PerUnitDeclaredValue.Value', DisplayName: "Deklarierter Wert"},
								{
									Name: 'Items.member.-.PerUnitDeclaredValue.CurrencyCode',
									DisplayName: "Deklarierte Währung"
								},
								{Name: 'Items.member.-.Quantity', DisplayName: "Menge"},
								{
									Name: 'Items.member.-.SellerFulfillmentOrderItemId',
									DisplayName: "Fulfillment-Auftrag Artikelnummer"
								},
								{Name: 'Items.member.-.FulfillmentNetworkSKU', DisplayName: "Fulfillment Network SKU"},
								{Name: 'Items.member.-.SellerSKU', DisplayName: "SKU"}
							]
						}
					]
				},
				"GetFulfillmentOrder": {
					Parameters: [{
						Name: 'SellerFulfillmentOrderId',
						DisplayName: "Fulfillment-Auftragsnummer",
						Required: true
					}]
				},
				"GetFulfillmentPreview": {
					Parameters: [
						{
							Name: 'Address', DisplayName: "Zieladresse", Required: true, Type: 'Complex',
							Parameters: [
								{Name: 'Address.Name', DisplayName: "Name"},
								{Name: 'Address.Line1', DisplayName: "Adresszeile 1"},
								{Name: 'Address.Line2', DisplayName: "Adresszeile 2"},
								{Name: 'Address.Line3', DisplayName: "Address 3"},
								{Name: 'Address.City', DisplayName: "Stadt"},
								{Name: 'Address.StateOrProvinceCode', DisplayName: "Bundesstaat/Provinz"},
								{Name: 'Address.PostalCode', DisplayName: "Postleitzahl"},
								{Name: 'Address.CountryCode', DisplayName: "Land"},
								{Name: 'Address.DistrictOrCounty', DisplayName: "District or County"},
								{Name: 'Address.PhoneNumber', DisplayName: "Phone Number"}
							]
						},
						{
							Name: 'Items', DisplayName: "Items", Type: 'Complex', Required: true, List: true,
							Parameters: [
								{Name: 'Items.member.-.Quantity', DisplayName: "Menge"},
								{
									Name: 'Items.member.-.SellerFulfillmentOrderItemId',
									DisplayName: "Fulfillment-Auftrag Artikelnummer"
								},
								{Name: 'Items.member.-.SellerSKU', DisplayName: "SKU"},
								{Name: 'Items.member.-.EstimatedShippingWeight', DisplayName: ""},
								{
									Name: 'Items.member.-.ShippingWeightCalculationMethod',
									DisplayName: "Versandgewicht-Berechnungsmethode"
								}
							]
						},
						{
							Name: 'ShippingSpeedCategories.member.-',
							DisplayName: "Versandgeschwindigkeit -Kategorie",
							List: true,
							Type: 'fba.ShippingSpeedCategory'
						}
					]
				},
				"GetPackageTrackingDetails": {
					Parameters: [
						{Name: 'PackageNumber', DisplayName: "Paketnummer", Required: true}
					]
				},
				"ListAllFulfillmentOrders": {
					Parameters: [
						{Name: 'QueryStartDateTime', DisplayName: "Startzeit", Required: true, Type: 'Timestamp'},
					]
				},
				"ListAllFulfillmentOrdersByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: "Nächster Token", Required: true}]
				}
			}
		} // end of FulfillmentOutbound
	} // end of groups
};
ScratchpadEnums['orders.FulfillmentChannels'] = ["AFN", "MFN"];
//China has specific order status InvoiceUnconfirmed
ScratchpadEnums['orders.OrderStatuses'] = ["Pending", "Unshipped", "PartiallyShipped", "Shipped", "Canceled", "Unfulfillable", "PendingAvailability"];
ScratchpadEnums['orders.PaymentMethods'] = ["COD", "CVS", "Other"];

ScratchpadApis['Orders'] = {
	Name: "Bestellungen",
	Version: "2013-09-01",
	Groups: {
		"Order Retrieval": {
			Name: "Bestellungen",
			Path: "/Orders/2013-09-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"ListOrders": {
					Parameters: [
						{Name: 'CreatedAfter', DisplayName: 'Erstellt nach', Type: 'Timestamp'},
						{Name: 'CreatedBefore', DisplayName: 'Vorher erstellt', Type: 'Timestamp'},
						{Name: 'LastUpdatedAfter', DisplayName: 'Zuletzt aktualisiert nach', Type: 'Timestamp'},
						{Name: 'LastUpdatedBefore', DisplayName: 'Zuletzt aktualisiert vor', Type: 'Timestamp'},
						{Name: 'MarketplaceId.Id.-', DisplayName: 'Marketplace-ID', List: true, Required: true},
						{
							Name: 'OrderStatus.Status.-',
							DisplayName: 'Bestellstatus',
							Type: 'orders.OrderStatuses',
							List: true
						},
						{
							Name: 'FulfillmentChannel.Channel.-',
							DisplayName: 'Erfüllungs-Channel',
							Type: 'orders.FulfillmentChannels',
							List: true
						},
						{Name: 'SellerOrderId', DisplayName: 'Verkäufer-Bestellungs-ID'},
						{Name: 'BuyerEmail', DisplayName: 'Käufer-E-Mail'},
						{
							Name: 'PaymentMethod.Method.-',
							DisplayName: 'Payment Method',
							Type: 'orders.PaymentMethods',
							List: true
						},
						{Name: 'TFMShipmentStatus.Status.-', DisplayName: 'Payment Method', List: true},
						{Name: 'MaxResultsPerPage', DisplayName: 'Max. Ergebnisse'}
					]
				},
				"ListOrdersByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}]
				},
				"GetOrder": {
					Parameters: [{Name: 'AmazonOrderId.Id.-', DisplayName: 'Bestellnr.', Required: true, List: true}]
				},
				"ListOrderItems": {
					Parameters: [{Name: 'AmazonOrderId', DisplayName: 'Bestellnr.', Required: true}]
				},
				"ListOrderItemsByNextToken": {
					Parameters: [{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}]
				}
			}
		}
	}
};

//Section for Sellers API.

ScratchpadApis['Sellers'] = {
	Name: "Verkäufer",
	Version: "2011-07-01",
	Groups: {
		"Sellers Retrieval": {
			Name: "Verkäufer",
			Path: "/Sellers/2011-07-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"ListMarketplaceParticipations": {
					Parameters: []
				},
				"ListMarketplaceParticipationsByNextToken": {
					Parameters: [{
						Name: 'NextToken',
						DisplayName: 'Nächster Token',
						Required: true
					}]
				}
			}
		}
	}
};

ScratchpadApis['Products'] = {
	Name: "Produkte",
	Version: "2011-10-01",
	Groups: {
		"Products": {
			Name: "Produkte",
			Path: "/Products/2011-10-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"ListMatchingProducts": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'Query', DisplayName: '', Required: true},
						{Name: 'QueryContextId', DisplayName: ''}
					]
				},
				"GetMatchingProduct": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'ASINList.ASIN.-', DisplayName: 'ASIN', List: true, Required: true}
					]
				},
				"GetMatchingProductForId": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'IdType', DisplayName: 'Id Type', Required: true},
						{Name: 'IdList.Id.-', DisplayName: 'Id', List: true, Required: true}
					]
				},
				"GetCompetitivePricingForSKU": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'SellerSKUList.SellerSKU.-', DisplayName: 'SKU', List: true, Required: true}
					]
				},
				"GetCompetitivePricingForASIN": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'ASINList.ASIN.-', DisplayName: 'ASIN', List: true, Required: true}
					]
				},
				"GetLowestPricedOffersForSKU": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'SellerSKU', DisplayName: 'SKU', Required: true},
						{Name: 'ItemCondition', DisplayName: 'Price', Required: true}
					]
				},
				"GetLowestPricedOffersForASIN": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'ASIN', DisplayName: 'ASIN', Required: true},
						{Name: 'ItemCondition', DisplayName: 'Item Condition', Required: true}
					]
				},
				"GetLowestOfferListingsForSKU": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'ItemCondition', DisplayName: ''},
						{Name: 'ExcludeMe', DisplayName: '', Type: 'bde.Boolean'},
						{Name: 'SellerSKUList.SellerSKU.-', DisplayName: 'SKU', List: true, Required: true}
					]
				},
				"GetLowestOfferListingsForASIN": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'ItemCondition', DisplayName: ''},
						{Name: 'ExcludeMe', DisplayName: '', Type: 'bde.Boolean'},
						{Name: 'ASINList.ASIN.-', DisplayName: 'ASIN', List: true, Required: true}
					]
				},
				"GetMyPriceForSKU": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'ItemCondition', DisplayName: ''},
						{Name: 'SellerSKUList.SellerSKU.-', DisplayName: 'SKU', List: true, Required: true}
					]
				},
				"GetMyPriceForASIN": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'ItemCondition', DisplayName: ''},
						{Name: 'ASINList.ASIN.-', DisplayName: 'ASIN', List: true, Required: true}
					]
				},
				"GetProductCategoriesForSKU": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'SellerSKU', DisplayName: 'SKU', Required: true}
					]
				},
				"GetProductCategoriesForASIN": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{Name: 'ASIN', DisplayName: 'ASIN', Required: true}
					]
				}
			}
		}
	}
};

ScratchpadEnums['recommendations.Categories'] = ["Inventory", "Selection", "Pricing", "Fulfillment", "ListingQuality", "GlobalSelling", "Advertising"];

ScratchpadApis['Recommendations'] = {
	Name: 'Empfehlungen',
	Version: "2013-04-01",
	Groups: {
		"Recommendations": {
			Name: 'Empfehlungen',
			Path: "/Recommendations/2013-04-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"GetLastUpdatedTimeForRecommendations": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true}
					]
				},
				"ListRecommendations": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true},
						{
							Name: 'RecommendationCategory',
							DisplayName: 'RecommendationCategory',
							Type: 'recommendations.Categories',
							Required: false
						},
						//grouping FilteOptionList into a comma separated list of FilterOptions - scratchpad does not have the ability to correctly index the elements in a list of depth &gt; 1
						{
							Name: 'CategoryQueryList',
							DisplayName: 'CategoryQueryList',
							Type: 'Complex',
							Required: false,
							List: true,
							Parameters: [
								{
									Name: 'CategoryQueryList.CategoryQuery.-.RecommendationCategory',
									DisplayName: 'RecommendationCategory',
									Type: 'recommendations.Categories'
								},
								{
									Name: 'CategoryQueryList.CategoryQuery.-.FilterOptions (Comma separated list of FilterOption values)',
									DisplayName: 'FilterOptionList'
								}
							]
						}
					]
				},
				"ListRecommendationsByNextToken": {
					Parameters: [
						{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}
					]
				}
			}
		}
	}
};


// Begin Subscriptions API Section

ScratchpadEnums['subscriptions.DeliveryChannels'] = ["SQS"];

ScratchpadEnums['subscriptions.NotificationTypes'] = ["AnyOfferChanged", "FulfillmentOrderStatus"];

ScratchpadEnums['subscriptions.DestinationKeys'] = ['sqsQueueUrl'];

ScratchpadParameters = {};

ScratchpadParameters.MarketplaceId = {Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: true};

ScratchpadParameters.Destination = {
	Name: 'Destination', DisplayName: 'Ziel', Type: 'Complex', Required: true,
	Parameters: [
		{
			Name: 'Destination.DeliveryChannel',
			DisplayName: 'Versandkanal',
			Type: 'subscriptions.DeliveryChannels',
			Required: true
		},
		{
			Name: 'Destination.AttributeList',
			DisplayName: 'Attribute-Liste',
			Type: 'Complex',
			Required: true,
			List: true,
			Parameters: [
				{
					Name: 'Destination.AttributeList.member.-.Key',
					DisplayName: 'Schlüssel',
					Required: true,
					Type: 'subscriptions.DestinationKeys'
				},
				{Name: 'Destination.AttributeList.member.-.Value', DisplayName: 'Wert', Required: true}
			]
		}
	]
};

ScratchpadParameters.NotificationType = {
	Name: 'NotificationType', DisplayName: 'Mitteilungstyp', Required: true, Type: 'subscriptions.NotificationTypes'
};

ScratchpadParameters.IsEnabled = {
	Name: 'IsEnabled', DisplayName: 'Aktiviert', Required: true, Type: 'bde.Boolean'
};

ScratchpadParameters.Subscription = {
	Name: 'Subscription', DisplayName: 'Benachrichtigung', Required: true, Type: 'Complex',
	Parameters: [
		{
			Name: 'Subscription.NotificationType',
			DisplayName: 'Mitteilungstyp',
			Required: true,
			Type: 'subscriptions.NotificationTypes'
		},
		{
			Name: 'Subscription.Destination', DisplayName: 'Ziel', Type: 'Complex', Required: true,
			Parameters: [
				{
					Name: 'Subscription.Destination.DeliveryChannel', DisplayName: 'Versandkanal',
					Type: 'subscriptions.DeliveryChannels', Required: true
				},
				{
					Name: 'Subscription.Destination.AttributeList',
					DisplayName: 'Attribute-Liste',
					Type: 'Complex',
					Required: true,
					List: true,
					Parameters: [
						{
							Name: 'Subscription.Destination.AttributeList.member.-.Key', DisplayName: 'Schlüssel',
							Required: true, Type: 'subscriptions.DestinationKeys'
						},
						{
							Name: 'Subscription.Destination.AttributeList.member.-.Value',
							DisplayName: 'Wert',
							Required: true
						}
					]
				}
			]
		},
		{Name: 'Subscription.IsEnabled', DisplayName: 'Aktiviert', Required: true, Type: 'bde.Boolean'}
	]
};

ScratchpadApis['Subscriptions'] = {
	Name: "Benachrichtigungen",
	Version: "2013-07-01",
	Groups: {
		"Destinations": {
			Name: "Benachrichtigungen",
			Path: "/Subscriptions/2013-07-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"RegisterDestination": {
					Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Destination]
				},
				"DeregisterDestination": {
					Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Destination]
				},
				"ListRegisteredDestinations": {
					Parameters: [ScratchpadParameters.MarketplaceId]
				},
				"SendTestNotificationToDestination": {
					Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Destination]
				}
			}
		},
		"Subscriptions": {
			Name: "Benachrichtigungen",
			Path: "/Subscriptions/2013-07-01",
			ApiCalls: {
				"CreateSubscription": {
					Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Subscription]
				},
				"GetSubscription": {
					Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.NotificationType, ScratchpadParameters.Destination]
				},
				"DeleteSubscription": {
					Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.NotificationType, ScratchpadParameters.Destination]
				},
				"ListSubscriptions": {
					Parameters: [ScratchpadParameters.MarketplaceId]
				},
				"UpdateSubscription": {
					Parameters: [ScratchpadParameters.MarketplaceId, ScratchpadParameters.Subscription]
				}
			}
		}
	}
};

// End Subscriptions API Section

ScratchpadApis['OffAmazonPayments-Sandbox'] = {
	Name: 'Aus-Amazon Payments Sandbox',
	Version: "2013-01-01",
	Groups: {
		"OffAmazonPayments-Sandbox": {
			Name: 'Aus-Amazon Payments Sandbox',
			Path: "/OffAmazonPayments_Sandbox/2013-01-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"GetOrderReferenceDetails": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{Name: 'AddressConsentToken', DisplayName: 'AddressConsentToken', Required: false}
					]
				},
				"SetOrderReferenceDetails": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{
							Name: 'OrderReferenceAttributes',
							DisplayName: 'Order Reference Attributes',
							Required: true,
							Type: 'Complex',
							Parameters: [
								{Name: 'OrderReferenceAttributes.OrderTotal.Amount', DisplayName: '', Required: true},
								{
									Name: 'OrderReferenceAttributes.OrderTotal.CurrencyCode',
									DisplayName: '',
									Required: true
								},
								{
									Name: 'OrderReferenceAttributes.SellerNote',
									DisplayName: 'Seller Note',
									Required: false,
									MaxLength: 1024
								},
								{
									Name: 'OrderReferenceAttributes.PlatformId',
									DisplayName: 'Platform Id',
									Required: false
								},
								{
									Name: 'SellerOrderAttributes',
									DisplayName: 'Seller Order Attributes',
									Required: false,
									Type: 'Complex',
									Parameters: [
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId',
											DisplayName: 'Verkäufer-Bestellungs-ID'
										},
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.StoreName',
											DisplayName: 'Store Name'
										},
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation',
											DisplayName: 'Custom Information'
										}
									]
								}
							]
						}
					]
				},
				"ConfirmOrderReference": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true}
					]
				},
				"CancelOrderReference": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{Name: 'CancelationReason', DisplayName: '', Required: false, MaxLength: 1024}
					]
				},
				"CloseOrderReference": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{Name: 'ClosureReason', DisplayName: 'Closure Reason', Required: false, MaxLength: 1024}
					]
				},
				"Authorize": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{
							Name: 'AuthorizationReferenceId',
							DisplayName: 'Authorization Reference Id',
							Required: true,
							MaxLength: 32
						},
						{
							Name: 'AuthorizationAmount',
							DisplayName: 'Authorization Amount',
							Type: 'Complex',
							Required: true,
							Parameters: [
								{Name: 'AuthorizationAmount.CurrencyCode', DisplayName: 'Currency Code'},
								{Name: 'AuthorizationAmount.Amount', DisplayName: 'Amount'}
							]
						},
						{
							Name: 'SellerAuthorizationNote',
							DisplayName: 'Seller Authorization Note',
							Required: false,
							MaxLength: 255
						},
						{Name: 'TransactionTimeout', DisplayName: 'Transaction Timeout', Required: false}
					]
				},
				"GetAuthorizationDetails": {
					Parameters: [
						{Name: 'AmazonAuthorizationId', DisplayName: '', Required: true}
					]
				},
				"CloseAuthorization": {
					Parameters: [
						{Name: 'AmazonAuthorizationId', DisplayName: '', Required: true},
						{Name: 'ClosureReason', DisplayName: 'Closure Reason', Required: false, MaxLength: 255}
					]
				},
				"Capture": {
					Parameters: [
						{Name: 'AmazonAuthorizationId', DisplayName: '', Required: true},
						{Name: 'CaptureReferenceId', DisplayName: '', Required: true, MaxLength: 32},
						{
							Name: 'CaptureAmount', DisplayName: '', Required: true, Type: 'Complex',
							Parameters: [
								{Name: 'CaptureAmount.CurrencyCode', DisplayName: 'Currency Code'},
								{Name: 'CaptureAmount.Amount', DisplayName: 'Amount'}
							]
						},
						{Name: 'SellerCaptureNote', DisplayName: '', Required: false, MaxLength: 255},
						{Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16}
					]
				},
				"GetCaptureDetails": {
					Parameters: [
						{Name: 'AmazonCaptureId', DisplayName: '', Required: true}
					]
				},
				"Refund": {
					Parameters: [
						{Name: 'AmazonCaptureId', DisplayName: '', Required: true},
						{Name: 'RefundReferenceId', DisplayName: '', Required: true},
						{
							Name: 'RefundAmount', DisplayName: '', Required: true, Type: 'Complex',
							Parameters: [
								{Name: 'RefundAmount.CurrencyCode', DisplayName: 'Currency Code'},
								{Name: 'RefundAmount.Amount', DisplayName: 'Amount'}
							]
						},
						{Name: 'SellerRefundNote', DisplayName: '', Required: false, MaxLength: 255},
						{Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16}
					]
				},
				"GetRefundDetails": {
					Parameters: [
						{Name: 'AmazonRefundId', DisplayName: '', Required: true}
					]
				},
				"CreateOrderReferenceForId": {
					Parameters: [
						{Name: 'Id', DisplayName: 'Id', Required: true},
						{Name: 'IdType', DisplayName: 'Id Type', Required: true},
						{Name: 'InheritShippingAddress', DisplayName: 'Inherit Shipping Address', Type: 'bde.Boolean'},
						{Name: 'ConfirmNow', DisplayName: 'Confirm Now', Type: 'bde.Boolean'},
						{
							Name: 'OrderReferenceAttributes',
							DisplayName: 'Order Reference Attributes',
							Type: 'Complex',
							Parameters: [
								{
									Name: 'OrderReferenceAttributes.OrderTotal',
									DisplayName: 'Order Total',
									Required: true,
									Type: 'Complex',
									Parameters: [
										{
											Name: 'OrderReferenceAttributes.OrderTotal.CurrencyCode',
											DisplayName: 'Currency Code',
											Required: true
										},
										{
											Name: 'OrderReferenceAttributes.OrderTotal.Amount',
											DisplayName: 'Amount',
											Required: true
										}
									]
								},
								{Name: 'OrderReferenceAttributes.PlatformId', DisplayName: 'Platform Id'},
								{
									Name: 'OrderReferenceAttributes.SellerNote',
									DisplayName: 'Seller Note',
									MaxLength: 1024
								},
								{
									Name: 'OrderReferenceAttributes.SellerOrderAttributes',
									DisplayName: 'Seller Order Attributes',
									Type: 'Complex',
									Parameters: [
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId',
											DisplayName: 'Verkäufer-Bestellungs-ID'
										},
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.StoreName',
											DisplayName: 'Store Name'
										},
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation',
											DisplayName: 'Custom Information'
										}
									]
								}
							]
						}
					]
				},
				"GetBillingAgreementDetails": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true},
						{Name: 'AddressConsentToken', DisplayName: 'AddressConsentToken'}
					]
				},
				"SetBillingAgreementDetails": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true},
						{
							Name: 'BillingAgreementAttributes',
							DisplayName: 'Billing Agreement Attributs',
							Required: true,
							Type: 'Complex',
							Parameters: [
								{Name: 'BillingAgreementAttributes.PlatformId', DisplayName: 'Platform Id'},
								{
									Name: 'BillingAgreementAttributes.SellerNote',
									DisplayName: 'Seller Note',
									MaxLength: 1024
								},
								{
									Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes',
									DisplayName: 'Seller Billing Agreement Attributes',
									Type: 'Complex',
									Parameters: [
										{
											Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.SellerBillingAgreementId',
											DisplayName: 'Seller Billing Agreement Id'
										},
										{
											Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.StoreName',
											DisplayName: 'Store Name'
										},
										{
											Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.CustomInformation',
											DisplayName: 'Custom Information'
										}
									]
								}
							]
						}
					]
				},
				"ConfirmBillingAgreement": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true}
					]
				},
				"ValidateBillingAgreement": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true}
					]
				},
				"AuthorizeOnBillingAgreement": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true},
						{
							Name: 'AuthorizationReferenceId',
							DisplayName: 'Authorization Reference Id',
							Required: true,
							MaxLength: 32
						},
						{
							Name: 'AuthorizationAmount',
							DisplayName: 'Authorization Amount',
							Required: true,
							Type: 'Complex',
							Parameters: [
								{Name: 'AuthorizationAmount.CurrencyCode', DisplayName: 'Currency Code'},
								{Name: 'AuthorizationAmount.Amount', DisplayName: 'Amount'}
							]
						},
						{Name: 'SellerAuthorizationNote', DisplayName: 'Seller Authorization Note'},
						{Name: 'TransactionTimeout', DisplayName: 'Transaction Timeout'},
						{Name: 'CaptureNow', DisplayName: 'Capture Now', Type: 'bde.Boolean'},
						{Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', MaxLength: 16},
						{Name: 'SellerNote', DisplayName: 'Seller Note', MaxLength: 1024},
						{Name: 'PlatformId', DisplayName: 'Platform Id'},
						{
							Name: 'SellerOrderAttributes', DisplayName: 'Seller Order Attributes', Type: 'Complex',
							Parameters: [
								{Name: 'SellerOrderAttributes.SellerOrderId', DisplayName: 'Verkäufer-Bestellungs-ID'},
								{Name: 'SellerOrderAttributes.StoreName', DisplayName: 'Store Name'},
								{Name: 'SellerOrderAttributes.CustomInformation', DisplayName: 'Custom Information'}
							]
						},
						{Name: 'InheritShippingAddress', DisplayName: 'Inherit Shipping Address', Type: 'bde.Boolean'}

					]
				},
				"CloseBillingAgreement": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true},
						{Name: 'ClosureReason', DisplayName: 'Closure Reason'}
					]
				}
			}
		},
	}
}

ScratchpadApis['OffAmazonPayments'] = {
	Name: 'Zahlungen für Nicht-Amazon-Websites',
	Version: "2013-01-01",
	Groups: {
		"OffAmazonPayments": {
			Name: 'Zahlungen für Nicht-Amazon-Websites',
			Path: "/OffAmazonPayments/2013-01-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"GetOrderReferenceDetails": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{Name: 'AddressConsentToken', DisplayName: 'AddressConsentToken', Required: false}
					]
				},
				"SetOrderReferenceDetails": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{
							Name: 'OrderReferenceAttributes',
							DisplayName: 'Order Reference Attributes',
							Required: true,
							Type: 'Complex',
							Parameters: [
								{Name: 'OrderReferenceAttributes.OrderTotal.Amount', DisplayName: '', Required: true},
								{
									Name: 'OrderReferenceAttributes.OrderTotal.CurrencyCode',
									DisplayName: '',
									Required: true
								},
								{
									Name: 'OrderReferenceAttributes.SellerNote',
									DisplayName: 'Seller Note',
									Required: false,
									MaxLength: 1024
								},
								{
									Name: 'OrderReferenceAttributes.PlatformId',
									DisplayName: 'Platform Id',
									Required: false
								},
								{
									Name: 'SellerOrderAttributes',
									DisplayName: 'Seller Order Attributes',
									Required: false,
									Type: 'Complex',
									Parameters: [
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId',
											DisplayName: 'Verkäufer-Bestellungs-ID'
										},
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.StoreName',
											DisplayName: 'Store Name'
										},
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation',
											DisplayName: 'Custom Information'
										}
									]
								}
							]
						}
					]
				},
				"ConfirmOrderReference": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true}
					]
				},
				"CancelOrderReference": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{Name: 'CancelationReason', DisplayName: '', Required: false, MaxLength: 1024}
					]
				},
				"CloseOrderReference": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{Name: 'ClosureReason', DisplayName: 'Closure Reason', Required: false, MaxLength: 1024}
					]
				},
				"Authorize": {
					Parameters: [
						{Name: 'AmazonOrderReferenceId', DisplayName: '', Required: true},
						{
							Name: 'AuthorizationReferenceId',
							DisplayName: 'Authorization Reference Id',
							Required: true,
							MaxLength: 32
						},
						{
							Name: 'AuthorizationAmount',
							DisplayName: 'Authorization Amount',
							Required: true,
							Type: 'Complex',
							Parameters: [
								{Name: 'AuthorizationAmount.CurrencyCode', DisplayName: 'Currency Code'},
								{Name: 'AuthorizationAmount.Amount', DisplayName: 'Amount'}
							]
						},
						{
							Name: 'SellerAuthorizationNote',
							DisplayName: 'Seller Authorization Note',
							Required: false,
							MaxLength: 255
						},
						{Name: 'TransactionTimeout', DisplayName: 'Transaction Timeout', Required: false}
					]
				},
				"GetAuthorizationDetails": {
					Parameters: [
						{Name: 'AmazonAuthorizationId', DisplayName: '', Required: true}
					]
				},
				"CloseAuthorization": {
					Parameters: [
						{Name: 'AmazonAuthorizationId', DisplayName: '', Required: true},
						{Name: 'ClosureReason', DisplayName: 'Closure Reason', Required: false, MaxLength: 255}
					]
				},
				"Capture": {
					Parameters: [
						{Name: 'AmazonAuthorizationId', DisplayName: '', Required: true},
						{Name: 'CaptureReferenceId', DisplayName: '', Required: true, MaxLength: 32},
						{
							Name: 'CaptureAmount', DisplayName: '', Required: true, Type: 'Complex',
							Parameters: [
								{Name: 'CaptureAmount.CurrencyCode', DisplayName: 'Currency Code'},
								{Name: 'CaptureAmount.Amount', DisplayName: 'Amount'}
							]
						},
						{Name: 'SellerCaptureNote', DisplayName: '', Required: false, MaxLength: 255},
						{Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16}
					]
				},
				"GetCaptureDetails": {
					Parameters: [
						{Name: 'AmazonCaptureId', DisplayName: '', Required: true}
					]
				},
				"Refund": {
					Parameters: [
						{Name: 'AmazonCaptureId', DisplayName: '', Required: true},
						{Name: 'RefundReferenceId', DisplayName: '', Required: true},
						{
							Name: 'RefundAmount', DisplayName: '', Required: true, Type: 'Complex',
							Parameters: [
								{Name: 'RefundAmount.CurrencyCode', DisplayName: 'Currency Code'},
								{Name: 'RefundAmount.Amount', DisplayName: 'Amount'}
							]
						},
						{Name: 'SellerRefundNote', DisplayName: '', Required: false, MaxLength: 255},
						{Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', Required: false, MaxLength: 16}
					]
				},
				"GetRefundDetails": {
					Parameters: [
						{Name: 'AmazonRefundId', DisplayName: '', Required: true}
					]
				},
				"CreateOrderReferenceForId": {
					Parameters: [
						{Name: 'Id', DisplayName: 'Id', Required: true},
						{Name: 'IdType', DisplayName: 'Id Type', Required: true},
						{Name: 'InheritShippingAddress', DisplayName: 'Inherit Shipping Address', Type: 'bde.Boolean'},
						{Name: 'ConfirmNow', DisplayName: 'Confirm Now', Type: 'bde.Boolean'},
						{
							Name: 'OrderReferenceAttributes',
							DisplayName: 'Order Reference Attributes',
							Type: 'Complex',
							Parameters: [
								{
									Name: 'OrderReferenceAttributes.OrderTotal',
									DisplayName: 'Order Total',
									Required: true,
									Type: 'Complex',
									Parameters: [
										{
											Name: 'OrderReferenceAttributes.OrderTotal.CurrencyCode',
											DisplayName: 'Currency Code',
											Required: true
										},
										{
											Name: 'OrderReferenceAttributes.OrderTotal.Amount',
											DisplayName: 'Amount',
											Required: true
										}
									]
								},
								{Name: 'OrderReferenceAttributes.PlatformId', DisplayName: 'Platform Id'},
								{
									Name: 'OrderReferenceAttributes.SellerNote',
									DisplayName: 'Seller Note',
									MaxLength: 1024
								},
								{
									Name: 'OrderReferenceAttributes.SellerOrderAttributes',
									DisplayName: 'Seller Order Attributes',
									Type: 'Complex',
									Parameters: [
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.SellerOrderId',
											DisplayName: 'Verkäufer-Bestellungs-ID'
										},
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.StoreName',
											DisplayName: 'Store Name'
										},
										{
											Name: 'OrderReferenceAttributes.SellerOrderAttributes.CustomInformation',
											DisplayName: 'Custom Information'
										}
									]
								}
							]
						}
					]
				},
				"GetBillingAgreementDetails": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true},
						{Name: 'AddressConsentToken', DisplayName: 'AddressConsentToken'}
					]
				},
				"SetBillingAgreementDetails": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true},
						{
							Name: 'BillingAgreementAttributes',
							DisplayName: 'Billing Agreement Attributs',
							Required: true,
							Type: 'Complex',
							Parameters: [
								{Name: 'BillingAgreementAttributes.PlatformId', DisplayName: 'Platform Id'},
								{
									Name: 'BillingAgreementAttributes.SellerNote',
									DisplayName: 'Seller Note',
									MaxLength: 1024
								},
								{
									Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes',
									DisplayName: 'Seller Billing Agreement Attributes',
									Type: 'Complex',
									Parameters: [
										{
											Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.SellerBillingAgreementId',
											DisplayName: 'Seller Billing Agreement Id'
										},
										{
											Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.StoreName',
											DisplayName: 'Store Name'
										},
										{
											Name: 'BillingAgreementAttributes.SellerBillingAgreementAttributes.CustomInformation',
											DisplayName: 'Custom Information'
										}
									]
								}
							]
						}
					]
				},
				"ConfirmBillingAgreement": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true}
					]
				},
				"ValidateBillingAgreement": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true}
					]
				},
				"AuthorizeOnBillingAgreement": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true},
						{
							Name: 'AuthorizationReferenceId',
							DisplayName: 'Authorization Reference Id',
							Required: true,
							MaxLength: 32
						},
						{
							Name: 'AuthorizationAmount',
							DisplayName: 'Authorization Amount',
							Required: true,
							Type: 'Complex',
							Parameters: [
								{Name: 'AuthorizationAmount.CurrencyCode', DisplayName: 'Currency Code'},
								{Name: 'AuthorizationAmount.Amount', DisplayName: 'Amount'}
							]
						},
						{Name: 'SellerAuthorizationNote', DisplayName: 'Seller Authorization Note'},
						{Name: 'TransactionTimeout', DisplayName: 'Transaction Timeout'},
						{Name: 'CaptureNow', DisplayName: 'Capture Now', Type: 'bde.Boolean'},
						{Name: 'SoftDescriptor', DisplayName: 'Soft Descriptor', MaxLength: 16},
						{Name: 'SellerNote', DisplayName: 'Seller Note', MaxLength: 1024},
						{Name: 'PlatformId', DisplayName: 'Platform Id'},
						{
							Name: 'SellerOrderAttributes', DisplayName: 'Seller Order Attributes', Type: 'Complex',
							Parameters: [
								{Name: 'SellerOrderAttributes.SellerOrderId', DisplayName: 'Verkäufer-Bestellungs-ID'},
								{Name: 'SellerOrderAttributes.StoreName', DisplayName: 'Store Name'},
								{Name: 'SellerOrderAttributes.CustomInformation', DisplayName: 'Custom Information'}
							]
						},
						{Name: 'InheritShippingAddress', DisplayName: 'Inherit Shipping Address', Type: 'bde.Boolean'}

					]
				},
				"CloseBillingAgreement": {
					Parameters: [
						{Name: 'AmazonBillingAgreementId', DisplayName: 'Amazon Billing Agreement Id', Required: true},
						{Name: 'ClosureReason', DisplayName: 'Closure Reason'}
					]
				}
			}
		},
	}
}

ScratchpadApis['CartInformation'] = {
	Name: "Cart Information",
	Version: "2014-03-01",
	Groups: {
		"CartInformation": {
			Name: "Cart Information",
			Path: "/CartInformation/2014-03-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"GetCarts": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: false},
						{Name: 'CartIdList.Id.-', DisplayName: 'Cart Id List', List: true, Required: true}
					]
				},
				"ListCarts": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: false},
						{Name: 'DateRangeStart', DisplayName: 'Date Range Start', Type: 'Timestamp', Required: false},
						{Name: 'DateRangeEnd', DisplayName: 'Date Range End', Type: 'Timestamp', Required: false}
					]
				},
				"ListCartsByNextToken": {
					Parameters: [
						{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}
					]
				}
			}
		}
	}
};
ScratchpadApis['CustomerInformation'] = {
	Name: "Customer Information",
	Version: "2014-03-01",
	Groups: {
		"CustomerInformation": {
			Name: "Customer Information",
			Path: "/CustomerInformation/2014-03-01",
			ApiCalls: {
				"GetServiceStatus": {
					Parameters: []
				},
				"GetCustomersForCustomerId": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: false},
						{Name: 'CustomerIdList.Id.-', DisplayName: 'Id', List: true, Required: true}
					]
				},
				"ListCustomers": {
					Parameters: [
						{Name: 'MarketplaceId', DisplayName: 'Marketplace-ID', Required: false},
						{Name: 'DateRangeType', DisplayName: 'Date Range Type', Type: 'DateRangeType', Required: false},
						{Name: 'DateRangeStart', DisplayName: 'Date Range Start', Type: 'Timestamp', Required: false},
						{Name: 'DateRangeEnd', DisplayName: 'Date Range End', Type: 'Timestamp', Required: false}
					]
				},
				"ListCustomersByNextToken": {
					Parameters: [
						{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}
					]
				}
			}
		}
	}
};

//Webstore API Section

ScratchpadApis['Finances'] = {
	Name: "Zahlungen",
	Version: "2015-05-01",
	Groups: {
		"Finances": {
			Name: "Zahlungen",
			Path: "/Finances/2015-05-01",
			ApiCalls: {
				"ListFinancialEventGroups": {
					Parameters: [
						{
							Name: 'FinancialEventGroupStartedAfter',
							DisplayName: 'Opened After',
							Type: 'Timestamp',
							Required: true
						},
						{
							Name: 'FinancialEventGroupStartedBefore',
							DisplayName: 'Opened Before',
							Type: 'Timestamp',
							Required: false
						},
						{Name: 'MaxResultsPerPage', DisplayName: 'Max. Ergebnisse', Required: false}
					]
				},
				"ListFinancialEventGroupsByNextToken": {
					Parameters: [
						{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}
					]
				},
				"ListFinancialEvents": {
					Parameters: [
						{Name: 'PostedAfter', DisplayName: 'Posted After', Type: 'Timestamp', Required: false},
						{Name: 'PostedBefore', DisplayName: 'Posted Before', Type: 'Timestamp', Required: false},
						{Name: 'FinancialEventGroupId', DisplayName: 'Financial Event Group Id', Required: false},
						{Name: 'AmazonOrderId', DisplayName: 'Amazon Order Id', Required: false},
						{Name: 'MaxResultsPerPage', DisplayName: 'Max. Ergebnisse', Required: false}
					]
				},
				"ListFinancialEventsByNextToken": {
					Parameters: [
						{Name: 'NextToken', DisplayName: 'Nächster Token', Required: true}
					]
				}
			}
		}
	}
}

ShipmentRequestDetails = {
	Name: 'ShipmentRequestDetails', DisplayName: 'ShipmentRequestDetails', Type: 'Complex', Required: true,
	Parameters: [
		{Name: 'ShipmentRequestDetails.AmazonOrderId', DisplayName: 'Amazon Order Id', Required: true},
		{Name: 'ShipmentRequestDetails.SellerOrderId', DisplayName: 'Seller Order Id'},
		{
			Name: 'ShipmentRequestDetails.MustArriveByDate',
			DisplayName: 'Must Arrive By Date',
			Required: true,
			Type: 'Timestamp'
		},
		{Name: 'ShipmentRequestDetails.ShipDate', DisplayName: 'Ship Date', Type: 'Timestamp'},
		{
			Name: 'ShipmentRequestDetails.PackageDimensions',
			DisplayName: 'Package Dimensions',
			Required: true,
			Type: 'Complex',
			Parameters: [
				{Name: 'ShipmentRequestDetails.PackageDimensions.Length', DisplayName: 'Length'},
				{Name: 'ShipmentRequestDetails.PackageDimensions.Width', DisplayName: 'Width'},
				{Name: 'ShipmentRequestDetails.PackageDimensions.Height', DisplayName: 'Height'},
				{Name: 'ShipmentRequestDetails.PackageDimensions.Unit', DisplayName: 'Unit'},
				{
					Name: 'ShipmentRequestDetails.PackageDimensions.PredefinedPackageDimensions',
					DisplayName: 'Predefined Package Dimensions'
				}
			]
		},
		{
			Name: 'ShipmentRequestDetails.Weight', DisplayName: 'Weight', Required: true, Type: 'Complex',
			Parameters: [
				{Name: 'ShipmentRequestDetails.Weight.Value', DisplayName: 'Value', Required: true},
				{Name: 'ShipmentRequestDetails.Weight.Unit', DisplayName: 'Unit', Required: true}
			]
		},
		{
			Name: 'ShipmentRequestDetails.ShipFromAddress',
			DisplayName: 'ShipmentRequestDetails.ShipFromAddress',
			Required: true,
			Type: 'Complex',
			Parameters: [
				{Name: 'ShipmentRequestDetails.ShipFromAddress.Name', DisplayName: 'Ship From Address', Required: true},
				{
					Name: 'ShipmentRequestDetails.ShipFromAddress.AddressLine1',
					DisplayName: 'Address Line 1',
					Required: true
				},
				{Name: 'ShipmentRequestDetails.ShipFromAddress.AddressLine2', DisplayName: 'Address Line 2'},
				{Name: 'ShipmentRequestDetails.ShipFromAddress.AddressLine3', DisplayName: 'Address Line 3'},
				{Name: 'ShipmentRequestDetails.ShipFromAddress.DistrictOrCounty', DisplayName: 'District Or County'},
				{Name: 'ShipmentRequestDetails.ShipFromAddress.City', DisplayName: 'City', Required: true},
				{
					Name: 'ShipmentRequestDetails.ShipFromAddress.StateOrProvinceCode',
					DisplayName: 'State Or Province Code'
				},
				{Name: 'ShipmentRequestDetails.ShipFromAddress.PostalCode', DisplayName: 'Postal Code', Required: true},
				{
					Name: 'ShipmentRequestDetails.ShipFromAddress.CountryCode',
					DisplayName: 'Country Code',
					Required: true
				},
				{Name: 'ShipmentRequestDetails.ShipFromAddress.Email', DisplayName: 'Email'},
				{Name: 'ShipmentRequestDetails.ShipFromAddress.Phone', DisplayName: 'Phone'}
			]
		},
		{
			Name: 'ShipmentRequestDetails.Insurance', DisplayName: 'Insurance', Type: 'Complex',
			Parameters: [
				{Name: 'ShipmentRequestDetails.Insurance.CurrencyCode', DisplayName: 'Currency Code'},
				{Name: 'ShipmentRequestDetails.Insurance.Amount', DisplayName: 'Amount'}
			]
		},
		{
			Name: 'ShipmentRequestDetails.ShippingServiceOptions',
			DisplayName: 'Shipping Service Options',
			Type: 'Complex',
			Parameters: [
				{
					Name: 'ShipmentRequestDetails.ShippingServiceOptions.DeliveryExperience',
					DisplayName: 'Delivery Experience'
				},
				{
					Name: 'ShipmentRequestDetails.ShippingServiceOptions.CarrierWillPickUp',
					DisplayName: 'Carrier Will Pick Up'
				},
				{
					Name: 'ShipmentRequestDetails.ShippingServiceOptions.DeclaredValue',
					DisplayName: 'Declared Value',
					Type: 'Complex',
					Parameters: [
						{
							Name: 'ShipmentRequestDetails.ShippingServiceOptions.DeclaredValue.CurrencyCode',
							DisplayName: 'Currency Code'
						},
						{
							Name: 'ShipmentRequestDetails.ShippingServiceOptions.DeclaredValue.Amount',
							DisplayName: 'Amount'
						}
					]
				}
			]
		},
		{
			Name: 'ShipmentRequestDetails.ItemList.Item', DisplayName: 'Item List', Required: true, Type: 'Complex',
			Parameters: [
				{
					Name: 'ShipmentRequestDetails.ItemList.Item.-.OrderItemId',
					DisplayName: 'Order Item Id',
					Required: true,
					List: true
				},
				{
					Name: 'ShipmentRequestDetails.ItemList.Item.-.Quantity',
					DisplayName: 'Quantity',
					Required: true,
					List: true
				}
			]
		}
	]
}

ScratchpadApis['MerchantFulfillment'] = {
	Name: "Merchant Fulfillment",
	Version: "2015-06-01",
	Groups: {
		"Merchant Fulfillment": {
			Name: "Merchant Fulfillment",
			Path: "/MerchantFulfillment/2015-06-01",
			ApiCalls: {
				"GetEligibleShippingServices": {
					Parameters: [ShipmentRequestDetails]
				},
				"CreateShipment": {
					Parameters: [
						{Name: 'ShippingServiceId', DisplayName: 'Shipping Service Id', Required: true},
						{Name: 'ShippingServiceOfferId', DisplayName: 'Shipping Service Offer Id'},
						ShipmentRequestDetails
					]
				},
				"GetShipment": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: 'Shipment Id', Required: true}
					]
				},
				"CancelShipment": {
					Parameters: [
						{Name: 'ShipmentId', DisplayName: 'Shipment Id', Required: true}
					]
				}
			}
		}
	}
}
