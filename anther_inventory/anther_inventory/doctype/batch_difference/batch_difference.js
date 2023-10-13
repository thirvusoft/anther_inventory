// Copyright (c) 2023, Anther and contributors
// For license information, please see license.txt

frappe.ui.form.on('Batch Difference', {
	scan: function(frm) {
		if(update_scan(frm.doc.scan)){
			let val = scanqty(frm.doc.scan,frm.doc.name)
			val.then(r=>{
				if (r){
					if(r[0] == 0) {
						let child = frm.add_child("scanned_data")
						child.item = r[2]
						child.batch= frm.doc.scan
						child.count = 1
						child.batch_qty = r[1]
						frm.refresh_field("scanned_data")
						frm.save()
					}
					else{
						console.log(r)
						frappe.model.set_value("Scanned Data",r[3],'count',r[0]+1)
						frm.refresh_field("scanned_data")
						frm.save()

						if(r[0] > r[1]){
							// frappe.msgprint(__("Scanned Qty - {0} is Greater than Batch Qty - {1}"),[res.message[2],res.message[3]])
							frappe.msgprint({
								message: __("Scanned Qty - {0} is Greater than Batch Qty - {1}",[r[0]+1,r[1]]),
								indicator: "red", title: __("Warning"),
								alert:true
							});
					}
					}
				}
			})
		}
		
		
	}
});


async function update_scan(value) {
	let len = 0;
    if (value) {
		await frappe.db.get_list('Batch',
			{fields:['name'], filters: { 'name': value }}).then((res) => {
				
				len = res.length
			});
	return len
	}
};

async function scanqty(value,name) {
	let scanned_qty = 0;
	let batch_qty = 0;
	scanned_qty  = await frappe.db.get_value('Scanned Data', {
		batch: value,
		parent: name,
		parentfield: 'scanned_data'
	}, ['count','name'],undefined,'Batch Difference');

	batch_qty = await frappe.db.get_value('Batch', {
		name: value,
	}, ['batch_qty','item']);
	let doc = scanned_qty.message.name 
	scanned_qty =  scanned_qty.message.count 
	let item = batch_qty.message.batch_qty
	batch_qty = batch_qty.message.batch_qty
	
	return [scanned_qty,batch_qty,item,doc]
	
};