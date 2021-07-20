#include <eosio/eosio.hpp>
#include <eosio/table.hpp>

class [[eosio::contract]] ro_users : public eosio::contract {
public:
   struct user_name_struct {
      uint32_t id;
      std::string name;
   };

   struct user_details_struct {
      uint32_t id;
      std::string state;
      uint32_t age;
   };

   struct full_user_struct {
      uint32_t id;
      std::string name;
      std::string state;
      uint32_t age;
   };

   struct [[eosio::table]] user_name_table : eosio::kv::table<user_name_struct, "username"_n> {
      KV_NAMED_INDEX("id"_n, id)

      user_name_table(eosio::name contract_name) {
         init(contract_name, id);
      }
   };

   struct [[eosio::table]] user_details_table : eosio::kv::table<user_details_struct, "userdetails"_n> {
      KV_NAMED_INDEX("id"_n, id)

      user_details_table(eosio::name contract_name) {
         init(contract_name, id);
      }
   };
   using contract::contract;
   user_name_struct s1a{
      .id = 1,
      .name = "Bob Smith"
   };
   user_details_struct s1b{
      .id = 1,
      .state = "California",
      .age = 25
   };

   user_name_struct s2a{
      .id = 2,
      .name = "Alice Smith"
   };
   user_details_struct s2b{
      .id = 2,
      .state = "Illinois",
      .age = 20
   };

   user_name_struct s3a{
      .id = 3,
      .name = "John Smith"
   };
   user_details_struct s3b{
      .id = 3,
      .state = "New York",
      .age = 42
   };

   user_name_struct s4a{
      .id = 4,
      .name = "Jack Smith"
   };
   user_details_struct s4b{
      .id = 4,
      .state = "Rhode Island",
      .age = 27
   };

   user_name_struct s5a{
      .id = 5,
      .name = "Youko Niihara"
   };
   user_details_struct s5b{
      .id = 5,
      .state = "Vermont",
      .age = 26
   };

   user_name_struct s6a{
      .id = 6,
      .name = "Rose Lee"
   };
   user_details_struct s6b{
      .id = 6,
      .state = "Alabama",
      .age = 18
   };

   user_name_struct s7a{
      .id = 7,
      .name = "Youko Kawakami"
   };
   user_details_struct s7b{
      .id = 7,
      .state = "Nevada",
      .age = 25
   };

   user_name_struct s8a{
      .id = 8,
      .name = "Yuu Yamada"
   };
   user_details_struct s8b{
      .id = 8,
      .state = "Oklahoma",
      .age = 24,
   };

   [[eosio::action]]
   void setup() {
      user_name_table tn{get_self()};
      user_details_table td{get_self()};

      tn.put(s1a, get_self());
      tn.put(s2a, get_self());
      tn.put(s3a, get_self());
      tn.put(s4a, get_self());
      tn.put(s5a, get_self());
      tn.put(s6a, get_self());
      tn.put(s7a, get_self());
      tn.put(s8a, get_self());

      td.put(s1b, get_self());
      td.put(s2b, get_self());
      td.put(s3b, get_self());
      td.put(s4b, get_self());
      td.put(s5b, get_self());
      td.put(s6b, get_self());
      td.put(s7b, get_self());
      td.put(s8b, get_self());
  }

   [[eosio::action eosio::read_only]]
   std::vector<full_user_struct> get() {
      user_name_table tn{get_self()};
      user_details_table td{get_self()};

      std::vector<full_user_struct> ret;
      auto itn = tn.id.begin();
      auto itn_e = tn.id.end();
      while(itn != itn_e){
         auto name_row = itn.value(); 
         full_user_struct s;
         s.id = name_row.id;
         s.name = name_row.name;
         auto itd = td.id.find(name_row.id);
         if (itd != td.id.end()) {
            auto details_row = itd.value();
            s.state = details_row.state;
            s.age = details_row.age;
         }
         ret.push_back(s);
         ++itn;
      }
      return ret;
   }

   [[eosio::action]]
   full_user_struct put(uint32_t id, std::string name, std::string state, uint32_t age ) {
      user_name_table tn{get_self()};
      user_details_table td{get_self()};
      tn.put({
         .id = id,
         .name = name
      }, get_self());
      td.put({
         .id = id,
         .state = state,
         .age = age
      }, get_self());
      return {
         .id = id,
         .name = name,
         .state = state,
         .age = age,
      };
   }

   [[eosio::action eosio::read_only]]
   full_user_struct putro(uint32_t id, std::string name, std::string state, uint32_t age ) {
      user_name_table tn{get_self()};
      user_details_table td{get_self()};
      tn.put({
         .id = id,
         .name = name
      }, get_self());
      td.put({
         .id = id,
         .state = state,
         .age = age
      }, get_self());
      return {
         .id = id,
         .name = name,
         .state = state,
         .age = age,
      };
   }
};