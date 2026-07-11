<?php
require_once __DIR__ . '/config.php';

try {
    $drivers = $db->query("
        SELECT d.*, GROUP_CONCAT(dr.location_id) as route_ids
        FROM drivers d
        LEFT JOIN driver_routes dr ON d.id = dr.driver_id
        GROUP BY d.id
        ORDER BY d.id
    ")->fetchAll(PDO::FETCH_ASSOC);

    foreach ($drivers as &$driver) {
        $driver['routes'] = $driver['route_ids'] ? explode(',', $driver['route_ids']) : [];
        unset($driver['route_ids']);
        $driver['rating'] = (float)$driver['rating'];
        $driver['reviews'] = (int)$driver['reviews'];
    }

    jsonResponse(['success' => true, 'drivers' => $drivers]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
