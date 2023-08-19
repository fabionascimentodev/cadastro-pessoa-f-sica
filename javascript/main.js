var cadastro = [];

$(document).ready(function () {
  $("#cadastrar").click(function () {
    console.log("cadastrado");
    if (
      $("#cpf").val().trim() != "" &&
      $("#nome").val().trim() != "" &&
      $("#idade").val().trim() != ""
    ) {
      var cpf = $("#cpf").val();
      var nome = $("#nome").val();
      var idade = $("#idade").val();

      cadastro.push(cpf);
      cadastro.push(nome);
      cadastro.push(idade);

      //para apagar os dados preenchidos após a mensagem de Cadastrado com sucesso!
      $("#cpf").val("");
      $("#nome").val("");
      $("#idade").val("");

      alert("Cadastrado com sucesso!");

    } else {
      if ($("#cpf").val().trim() == "") {
        alert("CPF não preenchido");
      } else if ($("#nome").val().trim() == "") {
        alert("NOME não preenchido");
      } else if ($("#idade").val().trim() == "") {
        alert("IDADE não preenchido");
      }
    }
  });
});

$(document).ready(function () {
  $("#visualizar").click(function () {
    var data = [];

    const table = document.getElementById("SelPessoa");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    if (cadastro.length > 0) {
      cadastro.forEach(function (item, indice, array) {
        data.push(item);
      });

      preencherTabela(data);
    } else {
      alert("Sem registro");
    }
  });
});

function preencherTabela(data) {
  var tbody = $("#SelPessoa");
  var n = 0;
  for (var i = 0; i < data.length; i += 3) {
    var tr = $("<tr>");
    n++;  
    tr.append("<td>" + n + "</td>");
    tr.append("<td>" + data[i] + "</td>");
    tr.append("<td>" + data[i + 1] + "</td>");
    tr.append("<td>" + data[i + 2] + "</td>");
    tr.append('<td> <button class="excluir" type="button" onclick="excluiRegistro(' + data[i].replaceAll(/[.-]/g,"") + ', this )">Excluir</button> </td>');
    tbody.append(tr); 
  }
}

function excluiRegistro(item, botao) {
  const rowIndex = botao.parentNode.parentNode.rowIndex;
  
  var pos = Buscar(item);
  cadastro.splice(pos, 1);
  cadastro.splice(pos, 1);
  cadastro.splice(pos, 1);

  console.log(rowIndex);
  document.getElementById("SelPessoa").deleteRow(rowIndex);
}

function Buscar(item) {
  return cadastro.indexOf(item);
}

//para segurar a ultima busca da posicao do cpf
var AtuCpf = 0;

// Atualizar
$(document).ready(function () {
  $('#buscar').click(function () {
    var cpf = $("#atualizarCpf").val();
    var AtuCpf = Buscar(cpf);

    if (cadastro.length > 0) {
      if (AtuCpf >= 0) {
        $("#atualizarNome").val(cadastro[AtuCpf + 1]);
        $("#atualizarIdade").val(cadastro[AtuCpf + 2]);
      } else {
        alert("CPF Inexistente!");
      }
    } else {
      alert("Sem Registro!");
    }
  });
});

$(document).ready(function () {
  $('#editar').click(function () {
    if ($('#atualizarCpf').val().trim() != "" && $('#atualizarNome').val().trim() != "" &&
      $('#atualizarIdade').val().trim() != "") {
      var pos = Buscar($('#atualizarCpf').val());

      cadastro[AtuCpf] = $('#atualizarCpf').val().trim();
      cadastro[AtuCpf + 1] = $('#atualizarNome').val().trim();
      cadastro[AtuCpf + 2] = $('#atualizarIdade').val().trim();

      console.log(AtuCpf +" "+AtuCpf+1);
      console.log(cadastro[AtuCpf] +" "+cadastro[AtuCpf+1]);

      $("#atualizarCpf").val("");
      $("#atualizarNome").val("");
      $("#atualizarIdade").val("");

      alert("Atualizado com Sucesso!");
      $("#visualizar").click();
    } else {
      alert("Formulário incompleto!");
    }
  });
});