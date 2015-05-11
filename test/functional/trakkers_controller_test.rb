require 'test_helper'

class TrakkersControllerTest < ActionController::TestCase
  setup do
    @trakker = trakkers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:trakkers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create trakker" do
    assert_difference('Trakker.count') do
      post :create, trakker: { date: @trakker.date, destination_service_area: @trakker.destination_service_area, location: @trakker.location, number: @trakker.number, origin_service_area: @trakker.origin_service_area, signed_for_by: @trakker.signed_for_by }
    end

    assert_redirected_to trakker_path(assigns(:trakker))
  end

  test "should show trakker" do
    get :show, id: @trakker
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @trakker
    assert_response :success
  end

  test "should update trakker" do
    put :update, id: @trakker, trakker: { date: @trakker.date, destination_service_area: @trakker.destination_service_area, location: @trakker.location, number: @trakker.number, origin_service_area: @trakker.origin_service_area, signed_for_by: @trakker.signed_for_by }
    assert_redirected_to trakker_path(assigns(:trakker))
  end

  test "should destroy trakker" do
    assert_difference('Trakker.count', -1) do
      delete :destroy, id: @trakker
    end

    assert_redirected_to trakkers_path
  end
end
