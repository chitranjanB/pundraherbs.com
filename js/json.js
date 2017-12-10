function updateMetaSections(data){
    $("meta[name=keywords]").attr("content",data.meta.keywords);
    $("meta[name=description]").attr("content",data.meta.description);
}

function updatePageTitle(data){
    $("title").text(data.pageTitle);
}

function updateProductImage(data){
    //alert(data.productImg.src+"\n"+data.productImg.alt+"\n"+data.productImg.title);
    $(".product-img").attr("src",data.productImg.src);
    $(".product-img").attr("alt",data.productImg.alt);
    $(".product-img").attr("title",data.productImg.title);
}

function updateProductTitle(data){
    //Change the product title
    $(".product-title").text(data.productTitle);
}

function updateProductDescription(data){
    //create a product-description div
    $(".product-title").after("<div class='description'></div>");

    //create hr tag inside
    $(".description").append("<hr/>");

    //create line 1 div
    $(".description").append("<div class='description-line1'></div>");

    

    //create line 2 div
    $(".description").append("<div class='description-line2'></div>");
    
    if(data.productDescription.line1.length>0){
        //change the product description
        $(".description-line1").text(data.productDescription.line1);
    }
    //line breaks
    if(data.productDescription.line1.length>0){
        $(".description-line1").after("</br>");
        $(".description-line2").text(data.productDescription.line2);
    }
}

function updateIndication(data){
    //change the product indication title
    var indicationTitle = data.indication.title;
    $(".indication-title").html("<u>"+indicationTitle+"</u>");

    //create the div with class as indication
    $(".indication-title").after("<div class='indication'></div>");

    //populate all the indications
    var list=data.indication.listOfIndications;
    $.each( list, function( index, indication){
        $(".indication").append(indication+"</br>");
    });
}


function updateIngredients(data){
    //change the product ingredients title
    var ingredientsTitle = data.ingredient.title;
    $(".ingredients-title").html("<u>"+ingredientsTitle+"</u>");

    //create the div with class as ingredient
    $(".ingredients-title").after("<div class='ingredients'></div>");

    //create a text saying each teaspoon contains this much
    $(".ingredients").append(data.ingredient.information + "</br></br>");
    
    //create a table inside ingredients div class
    $("<table><tbody></tbody></table>").appendTo($(".ingredients"));

    //create the tr and td and Populate rows with ingredient and amount
    var list = data.ingredient.listOfIngredients;
    $.each( list, function( index, entry){
        $(".ingredients>table>tbody").append("<tr><td>"+entry.ingredientName+"</td><td>"+entry.ingredientAmount+"</td></tr>");
    });
}

function updateDosage(data){
    //change the dosage title
    var dosageTitle = data.dosage.title;
    $(".dosage-title").html("<u>"+dosageTitle+"</u>");

    //populate all the dosage
    var list = data.dosage.availableDosages;
    $.each( list, function( index, dosage){
        $(".dosage-title").after("<div class='dosage'>"+dosage+"</div>");
    });
}

function updatePacking(data){
    var packingTitle = data.packing.title;
    $(".packing-title").html("<u>"+packingTitle+"</u>");

    //populate all the packing
    var list = data.packing.availableSizes;
    $.each( list, function( index, packing){
        $(".packing-title").after("<div class='packing'>"+packing+"</div>");
    });
}


function renderThisPage(data){
    updateMetaSections(data);
    updatePageTitle(data);
    updateProductImage(data);
    updateProductTitle(data);
    updateProductDescription(data);
    updateIndication(data);
    updateIngredients(data);
    updateDosage(data);
    updatePacking(data);
}


function renderPortfolioSection(data){
    $.each( data, function(index, product){
       $("#portfolio-wrapper").append("<div class='col-lg-4 col-md-6 portfolio-item "+product.details.tag+"'>"+
                                        "<a href='"+product.details.alink+"'>"+
                                            "<img src='"+product.img.src+"' alt='"+product.img.alt+"'>"+
                                            "<div class='details'>"+
                                            "<h4>"+product.details.name+"</h4>"+
                                             "<span>"+product.details.description+"</span>"+
                                            "</div>"+
                                        "</a>"+
                                      "</div>");

        //if the img not available then show a default not found image
        if(product.img.src.length === 0){
            $("img[alt='"+product.img.alt+"']").attr("onError","this.onerror=null;this.src='img/portfolio/notfound.png'");
        }
    });
}