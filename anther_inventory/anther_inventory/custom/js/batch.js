frappe.ui.form.on('Batch Difference', {
    validate:function(frm){
        if(frm.is_new()){
            if(frm.doc.reference_doctype == "Purchase Receipt"){
                let inc_rate = inc_rate(frm.doc.item,frm.doc.reference_name)
                frm.set_value('incoming_rate',inc_rate)
            }
            else if(frm.doc.reference_doctype == "Stock Entry"){
                let inc_rate = entry_rate(frm.doc.item,frm.doc.reference_name)
                frm.set_value('incoming_rate',inc_rate)
            }
            else if(frm.doc.reference_doctype == "Stock Reconciliation"){
                let inc_rate = rec_rate(frm.doc.item,frm.doc.reference_name)
                frm.set_value('incoming_rate',inc_rate)
            }
        }
    }
})

async function inc_rate(item,reference_name){
    let rate  = await frappe.db.get_value('Purchase Receipt Item', {
		item_code: item,
		parent: reference_name,
	}, ['valuation_rate'],undefined,'Batch Difference');
    rate =  rate.message.valuation_rate
    return rate
}
async function entry_rate(item,reference_name){
    let rate  = await frappe.db.get_value('Stock Entry Detail', {
		item_code: item,
		parent: reference_name,
	}, ['valuation_rate'],undefined,'Batch Difference');
    rate =  rate.message.valuation_rate
    return rate
}
async function rec_rate(item,reference_name){
    let rate  = await frappe.db.get_value('Stock Reconciliation Item', {
		item_code: item,
		parent: reference_name,
	}, ['valuation_rate'],undefined,'Batch Difference');
    rate =  rate.message.valuation_rate
    return rate
}