$(document).ready(function() {
  const $container = $("#container");
  $.getJSON("http://localhost:3000/items").then(function(fishes) {
    fishes.forEach(function(fish) {
      let $newFish = $("<li>", {
        html: `
            ${fish.name} ${fish.type}
            <button class="delete">X</button>
            <button class="update">U</button>
        `,
        "data-id": `${fish.id}`
      });
      $container.append($newFish);
    });
  });

  $container.on("click", ".updateSub", function(e) {
    e.preventDefault()
    const name = $("#name").val();
    const type = $("#type").val();
    const id = Number($(".updateSub").attr('id'))
    $.patch("http://localhost:3000/items/${id}", { name, type }).then(function(fish) {
      console.log('update')
    });
  })

  $(".submit").on("submit", function(e) {
    e.preventDefault();
    const name = $("#name").val();
    const type = $("#type").val();
    $.post("http://localhost:3000/items", { name, type }).then(function(fish) {
      let $newFish = $("<li>", {
        html: `
            ${fish.name} ${fish.type}
            <button class="delete">X</button>
            <button class="update">U</button>
        `,
        "data-id": `${fish.id}`
      });
      $container.append($newFish);
      $("#new-fish-form").trigger("reset");
    });
  });

  $container.on("click", ".delete", function(e) {
    e.preventDefault();
    const id = $(e.target)
      .parent()
      .data("id");
    const type = $
      .ajax({
        method: "DELETE",
        url: `http://localhost:3000/items/${id}`
      })
      .then(function() {
        $(e.target)
          .parent()
          .remove();
      });
  });

  $container.on("click", ".update", function(e) {
    e.preventDefault();
    const updateButton = $(".updateSub")
    const id = $(e.target)
    .parent()
    .data("id")
    updateButton.attr('id', id)
    console.log(id)
    const type = $
    .ajax({
      method: "GET",
      url: `http://localhost:3000/items/${id}`
    })
    .then(function(value){
       $("#name").val(value[0].name);
       $("#type").val(value[0].type)
    })
  })
});