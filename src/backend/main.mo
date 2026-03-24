import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  type Crop = {
    name : Text;
    description : Text;
    season : Text;
    watering : Text;
    spacing : Text;
    daysToHarvest : Nat;
  };

  type Pest = {
    name : Text;
    affectedCrops : Text;
    symptoms : Text;
    treatment : Text;
  };

  type Question = {
    question : Text;
    answer : Text;
  };

  public type FarmLog = {
    date : Text;
    note : Text;
    crop : Text;
  };

  public type Profile = {
    farmName : Text;
    location : Text;
  };

  // Helpers
  module FarmLog {
    public func compare(farmLog1 : FarmLog, farmLog2 : FarmLog) : Order.Order {
      Text.compare(farmLog1.date, farmLog2.date);
    };
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let farmLogs = Map.empty<Principal, List.List<FarmLog>>();
  let profiles = Map.empty<Principal, Profile>();

  let crops = List.fromArray<Crop>(
    [
      {
        name = "Tomato";
        description = "A red, juicy fruit often grown as a vegetable.";
        season = "Spring-Summer";
        watering = "Regular, consistent moisture";
        spacing = "18-24 inches apart";
        daysToHarvest = 60;
      },
      {
        name = "Carrot";
        description = "An orange root vegetable.";
        season = "Spring/Fall";
        watering = "Keep soil moist";
        spacing = "2-3 inches apart";
        daysToHarvest = 70;
      },
    ],
  );
  let pests = List.fromArray<Pest>(
    [
      {
        name = "Aphids";
        affectedCrops = "Most vegetables";
        symptoms = "Curling leaves, sticky residue";
        treatment = "Insecticidal soap, ladybugs";
      },
      {
        name = "Powdery Mildew";
        affectedCrops = "Cucumbers, squash";
        symptoms = "White powdery spots";
        treatment = "Neem oil, proper spacing";
      },
    ],
  );
  let questions = List.fromArray<Question>(
    [
      {
        question = "How often should I water tomatoes?";
        answer = "Water tomatoes when the top inch of soil is dry.";
      },
      {
        question = "What is the best soil for carrots?";
        answer = "Well-drained, loose soil works best for carrots.";
      },
    ],
  );

  // Farm log
  public type AddFarmLogRequest = {
    date : Text;
    note : Text;
    crop : Text;
  };

  public shared ({ caller }) func addFarmLog(request : AddFarmLogRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add farm logs");
    };
    let farmLog : FarmLog = {
      date = request.date;
      note = request.note;
      crop = request.crop;
    };
    switch (farmLogs.get(caller)) {
      case (null) {
        let newList = List.empty<FarmLog>();
        newList.add(farmLog);
        farmLogs.add(caller, newList);
      };
      case (?logs) { logs.add(farmLog) };
    };
  };

  public query ({ caller }) func getMyFarmLogs() : async [FarmLog] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view farm logs");
    };
    switch (farmLogs.get(caller)) {
      case (null) { [] };
      case (?logs) { logs.toArray().sort() };
    };
  };

  // Q&A
  public query ({ caller }) func searchQuestions(keyword : Text) : async [Question] {
    questions.filter(
      func(q) { q.question.contains(#text keyword) or q.answer.contains(#text keyword) }
    ).toArray();
  };

  public query ({ caller }) func getAllQuestions() : async [Question] {
    questions.toArray();
  };

  // Crops
  public query ({ caller }) func searchCrops(keyword : Text) : async [Crop] {
    crops.filter(
      func(crop) {
        crop.name.contains(#text keyword) or crop.description.contains(#text keyword)
      }
    ).toArray();
  };

  public query ({ caller }) func getAllCrops() : async [Crop] {
    crops.toArray();
  };

  // Pests
  public query ({ caller }) func searchPests(keyword : Text) : async [Pest] {
    pests.filter(
      func(pest) {
        pest.name.contains(#text keyword) or pest.symptoms.contains(#text keyword)
      }
    ).toArray();
  };

  public query ({ caller }) func getAllPests() : async [Pest] {
    pests.toArray();
  };

  // Profile
  public query ({ caller }) func getCallerProfile() : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    profiles.get(caller);
  };

  public shared ({ caller }) func saveCallerProfile(profile : Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    profiles.add(caller, profile);
  };
};
