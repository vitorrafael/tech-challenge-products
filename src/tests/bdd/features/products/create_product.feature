Feature: Create Product
  Scenario: Create a product with valid data
    Given I have a product with name "Hamburguer" and category "Lanche" and price "10.00"
    When I create the product
    Then should create product with name "Hamburguer"
