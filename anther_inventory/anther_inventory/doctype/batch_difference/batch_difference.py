# Copyright (c) 2023, Anther and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _
class BatchDifference(Document):
	pass

@frappe.whitelist()
def update_scan(value):
	if value and len(frappe.get_all('Batch',filters={'name':value},fields=['name'])):
		single_doc = frappe.get_single("Batch Difference")
		scanned_qty = frappe.get_value("Scanned Data",{'batch':value,'parent':single_doc.name},'count')
		batch_qty = frappe.get_value("Batch",value,'batch_qty')
		
		# if scanned_qty and batch_qty and scanned_qty+1 > batch_qty:
		# 	# frappe.msgprint(f"Scanned Qty - {scanned_qty+1} is Greater than Batch Qty - {batch_qty}")
		# 	frappe.msgprint(_("Scanned Qty - {0} is Greater than Batch Qty - {1}").format(scanned_qty+1,batch_qty))

		if not scanned_qty:
			return [1,frappe.get_value("Batch",value,'item'),batch_qty]
		else:
			return [0,frappe.get_value("Scanned Data",{'batch':value,'parent':single_doc.name},'name'),scanned_qty+1,batch_qty]