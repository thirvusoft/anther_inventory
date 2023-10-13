import frappe
def update_incoming_rate(doc,event):
    if doc.reference_doctype == "Purchase Receipt":
        doc.incoming_rate = frappe.get_value("Purchase Receipt Item",{'item_code':doc.item,'parent':doc.reference_name},'valuation_rate')
    elif doc.reference_doctype == "Stock Entry":
        doc.incoming_rate = frappe.get_value("Stock Entry Detail",{'item_code':doc.item,'parent':doc.reference_name},'valuation_rate')
    elif doc.reference_doctype == "Stock Reconciliation":
        doc.incoming_rate = frappe.get_value("Stock Reconciliation Item",{'item_code':doc.item,'parent':doc.reference_name},'valuation_rate')
    doc.save()