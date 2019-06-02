
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE foodtruck.game_careerequipment;
TRUNCATE foodtruck.game_career;

-- Trucks
TRUNCATE foodtruck.game_truck;
INSERT INTO foodtruck.game_truck
(id, name, cost, capacity, created)
VALUES(1, 'First Truck', 10000.00, 1000.00, '2019-05-06 13:04:18.310');
INSERT INTO foodtruck.game_truck
(id, name, cost, capacity, created)
VALUES(2, 'Second Truck', 50000.00, 5000.00, '2019-05-06 13:04:18.310');
INSERT INTO foodtruck.game_truck
(id, name, cost, capacity, created)
VALUES(3, 'Third Truck', 100000.00, 10000.00, '2019-05-06 13:04:18.310');

-- Locations
TRUNCATE foodtruck.game_location;
INSERT INTO foodtruck.game_location
(id, name, cost, created, popularity, truck_position, keywords)
VALUES(1, 'Neighborhood', 0.00, '2019-05-06 13:04:18.310', 0.1, "{}", "[]");
INSERT INTO foodtruck.game_location
(id, name, cost, created, popularity, truck_position, keywords)
VALUES(2, 'Big Company', 500.00, '2019-05-06 13:04:18.310', 0.15, "{}", "[]");
INSERT INTO foodtruck.game_location
(id, name, cost, created, popularity, truck_position, keywords)
VALUES(3, 'Beach', 1000.00, '2019-05-06 13:04:18.310', 0.2, "{}", "[]");
INSERT INTO foodtruck.game_location
(id, name, cost, created, popularity, truck_position, keywords)
VALUES(4, 'Carnival', 2000.00, '2019-05-06 13:04:18.310', 0.25, "{}", "[]");

-- Menu Item Equipment
TRUNCATE foodtruck.game_menuitemequipment;
INSERT INTO foodtruck.game_menuitemequipment
(id, created, equipment_id, menu_item_id)
VALUES(1, '2019-05-06 13:14:50.487', 5, 2);
INSERT INTO foodtruck.game_menuitemequipment
(id, created, equipment_id, menu_item_id)
VALUES(2, '2019-05-06 13:14:53.508', 5, 3);
INSERT INTO foodtruck.game_menuitemequipment
(id, created, equipment_id, menu_item_id)
VALUES(3, '2019-05-06 13:14:57.075', 7, 4);
INSERT INTO foodtruck.game_menuitemequipment
(id, created, equipment_id, menu_item_id)
VALUES(4, '2019-05-06 13:15:01.105', 6, 5);
INSERT INTO foodtruck.game_menuitemequipment
(id, created, equipment_id, menu_item_id)
VALUES(5, '2019-05-06 13:15:04.795', 6, 6);
INSERT INTO foodtruck.game_menuitemequipment
(id, created, equipment_id, menu_item_id)
VALUES(6, '2019-05-06 13:15:09.253', 1, 7);
INSERT INTO foodtruck.game_menuitemequipment
(id, created, equipment_id, menu_item_id)
VALUES(7, '2019-05-06 13:15:13.847', 4, 8);
INSERT INTO foodtruck.game_menuitemequipment
(id, created, equipment_id, menu_item_id)
VALUES(8, '2019-05-06 13:15:18.089', 3, 9);

-- Menu Item Resources
TRUNCATE foodtruck.game_menuitemresource;
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(1, 0.25, '2019-05-06 13:10:26.633', 2, 9);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(2, 0.10, '2019-05-06 13:10:44.485', 2, 10);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(3, 0.15, '2019-05-06 13:10:51.656', 2, 11);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(4, 1.00, '2019-05-06 13:10:58.642', 2, 12);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(5, 1.00, '2019-05-06 13:11:04.470', 2, 14);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(6, 0.25, '2019-05-06 13:11:22.220', 3, 9);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(7, 0.10, '2019-05-06 13:11:27.698', 3, 10);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(8, 0.15, '2019-05-06 13:11:33.112', 3, 11);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(9, 1.00, '2019-05-06 13:11:37.592', 3, 13);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(10, 1.00, '2019-05-06 13:11:40.861', 3, 14);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(11, 0.25, '2019-05-06 13:11:51.190', 4, 11);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(12, 0.25, '2019-05-06 13:12:04.137', 4, 16);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(13, 0.25, '2019-05-06 13:12:12.719', 4, 17);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(14, 0.25, '2019-05-06 13:12:26.018', 5, 15);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(15, 1.00, '2019-05-06 13:12:36.102', 5, 14);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(16, 1.00, '2019-05-06 13:12:56.080', 4, 14);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(17, 0.25, '2019-05-06 13:13:11.374', 6, 16);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(18, 1.00, '2019-05-06 13:13:16.209', 6, 14);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(19, 0.25, '2019-05-06 13:13:28.940', 7, 4);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(20, 1.50, '2019-05-06 13:14:03.811', 8, 8);
INSERT INTO foodtruck.game_menuitemresource
(id, quantity, created, menu_item_id, resource_id)
VALUES(21, 0.15, '2019-05-06 13:14:24.460', 9, 7);

-- Equipment
TRUNCATE foodtruck.game_equipment;
INSERT INTO foodtruck.game_equipment
(id, name, cost, weight, created)
VALUES(1, 'Cotton Candy Machine', 200.00, 20.00, '2019-05-06 13:04:18.310');
INSERT INTO foodtruck.game_equipment
(id, name, cost, weight, created)
VALUES(2, 'Milkshake Machine', 750.00, 75.00, '2019-05-06 13:04:53.697');
INSERT INTO foodtruck.game_equipment
(id, name, cost, weight, created)
VALUES(3, 'Coffee Machine', 1000.00, 100.00, '2019-05-06 13:05:36.917');
INSERT INTO foodtruck.game_equipment
(id, name, cost, weight, created)
VALUES(4, 'Soda Fountain', 2000.00, 200.00, '2019-05-06 13:07:09.218');
INSERT INTO foodtruck.game_equipment
(id, name, cost, weight, created)
VALUES(5, 'Gas Range', 1200.00, 150.00, '2019-05-06 13:07:55.688');
INSERT INTO foodtruck.game_equipment
(id, name, cost, weight, created)
VALUES(6, 'Deep Fryer', 500.00, 200.00, '2019-05-06 13:08:29.526');
INSERT INTO foodtruck.game_equipment
(id, name, cost, weight, created)
VALUES(7, 'Oven', 1500.00, 500.00, '2019-05-06 13:09:27.030');
INSERT INTO foodtruck.game_equipment
(id, name, cost, weight, created)
VALUES(8, 'Refrigerator', 500.00, 200.00, '2019-05-06 13:16:08.476');

-- Menu Items
TRUNCATE foodtruck.game_menuitem;
INSERT INTO foodtruck.game_menuitem
(id, name, created)
VALUES(2, 'Tacos', '2019-05-05 13:39:17.911');
INSERT INTO foodtruck.game_menuitem
(id, name, created)
VALUES(3, 'Burgers', '2019-05-05 13:39:25.359');
INSERT INTO foodtruck.game_menuitem
(id, name, created)
VALUES(4, 'Pizza', '2019-05-05 13:39:34.404');
INSERT INTO foodtruck.game_menuitem
(id, name, created)
VALUES(5, 'French Fries', '2019-05-05 13:39:47.965');
INSERT INTO foodtruck.game_menuitem
(id, name, created)
VALUES(6, 'Donuts', '2019-05-05 13:39:54.829');
INSERT INTO foodtruck.game_menuitem
(id, name, created)
VALUES(7, 'Cotton Candy', '2019-05-05 13:40:14.949');
INSERT INTO foodtruck.game_menuitem
(id, name, created)
VALUES(8, 'Soda', '2019-05-05 13:40:19.511');
INSERT INTO foodtruck.game_menuitem
(id, name, created)
VALUES(9, 'Coffee', '2019-05-05 13:40:23.645');

-- Resources
TRUNCATE foodtruck.game_resource;
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(4, 'Sugar', 0.50, '2019-05-05 13:50:04.436', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(5, 'Ice', 0.20, '2019-05-05 13:50:45.046', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(6, 'Milk', 0.70, '2019-05-05 13:51:37.776', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(7, 'Coffee Beans', 8.00, '2019-05-05 13:53:02.003', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(8, 'Soda', 0.40, '2019-05-05 13:56:55.412', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(9, 'Ground Beef', 4.00, '2019-05-05 13:57:45.261', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(10, 'Lettuce', 2.00, '2019-05-05 13:58:33.455', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(11, 'Cheese', 5.00, '2019-05-05 13:59:12.059', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(12, 'Tortillas', 0.25, '2019-05-05 13:59:57.156', 'item');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(13, 'Buns', 3.00, '2019-05-05 14:00:39.636', 'item');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(14, 'Baskets', 0.50, '2019-05-05 14:22:30.150', 'item');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(15, 'Potatoes', 0.60, '2019-05-05 14:23:24.440', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(16, 'Dough', 0.40, '2019-05-05 14:24:02.757', 'pound');
INSERT INTO foodtruck.game_resource
(id, name, cost, created, unit)
VALUES(17, 'Red Sauce', 1.40, '2019-05-05 14:25:02.464', 'pound');
