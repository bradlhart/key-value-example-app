project( ro_users )
cmake_minimum_required( VERSION 3.18 )

set( EOSIO_WASM_OLD_BEHAVIOR "Off" )
find_package( eosio.cdt )

add_contract( ro_users ro_users ro_users.cpp )
target_ricardian_directory( ro_users ${CMAKE_SOURCE_DIR}/../ricardian )
