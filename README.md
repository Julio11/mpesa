M-Pesa self-registration portal
===============================

Sobre:
======
Este portal web foi desenvolvida com o objectivo de fornecer um novo canal de auto registo de clientes M-Pesa, utilizado um web server (REST API).

Instruções para execução:
=========================
Requisitos:
1. Navegador web;

O projecto foi desenvolvimento de modo a facilitar a execução. Clica com o botão direito (Windows) ou dê um clique duplo (Mac) no ficheiro index.html localizado neste diretório e escolha a opção “Abrir com”, de seguida selecciona o navegador de sua preferência.

Regras:
=======
* Apenas são permitidos números de telefone da operadora Vodacom com 9 dígitos;
* Os números de documento de identificação contêm validações de acordo com os respectivos tipos;
* A idade do cliente não pode ser inferior a 16 anos.

Problemas conhecidos:
=====================
* Ainda faltam mais tipos de documentos, mas é necessário fazer o estudo dos seus respectivos identificadores para a devida validação;
* A API ainda não foi implementada, por isso não foi feito um teste conclusivo do portal.
